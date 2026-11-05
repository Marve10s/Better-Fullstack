import { randomBytes } from "node:crypto";
import { createServer } from "node:net";
import { join, resolve } from "node:path";

const projectDir = resolve(process.argv[2] ?? "");
const release = join(projectDir, "_build/prod/rel/bfs_elixir_release_proof/bin/bfs_elixir_release_proof");
if (!process.argv[2] || !(await Bun.file(release).exists())) {
  throw new Error("Pass a generated project containing its built bfs_elixir_release_proof release");
}

const listener = createServer();
await new Promise<void>((resolve, reject) => {
  listener.once("error", reject);
  listener.listen(0, "127.0.0.1", resolve);
});
const address = listener.address();
if (address === null || typeof address === "string") throw new Error("Could not reserve an EPMD port");
const epmdPort = String(address.port);
await new Promise<void>((resolve, reject) => listener.close((error) => error ? reject(error) : resolve()));

const firstName = `bfs_release_a_${process.pid}`;
const secondName = `bfs_release_b_${process.pid}`;
const firstNode = `${firstName}@127.0.0.1`;
const secondNode = `${secondName}@127.0.0.1`;
const environment = {
  ...process.env,
  ERL_EPMD_PORT: epmdPort,
  ERL_EPMD_ADDRESS: "127.0.0.1",
  ERL_FLAGS: "+S 1:1 +A 1 -kernel inet_dist_use_interface {127,0,0,1}",
  RELEASE_COOKIE: randomBytes(32).toString("hex"),
  CLUSTER_HOSTS: `${firstNode},${secondNode}`,
  DNS_CLUSTER_QUERY: "",
  FLY_PRIVATE_IP: "",
};
const firstEnvironment = { ...environment, RELEASE_NODE: firstNode };
const secondEnvironment = { ...environment, RELEASE_NODE: secondNode };

async function command(args: string[], env = environment) {
  const child = Bun.spawn(args, { cwd: projectDir, env, stdin: "ignore", stdout: "pipe", stderr: "pipe" });
  const deadline = setTimeout(() => child.kill("SIGKILL"), 20_000);
  try {
    const [exitCode, stdout, stderr] = await Promise.all([
      child.exited,
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
    ]);
    return { exitCode, stdout, stderr };
  } finally {
    clearTimeout(deadline);
  }
}

const missingCookie = await command([release, "eval", "IO.puts(:unexpected)"], {
  ...environment,
  RELEASE_COOKIE: "",
});
if (missingCookie.exitCode === 0 || !missingCookie.stderr.includes("Set RELEASE_COOKIE")) {
  throw new Error("The clustered release did not reject a missing shared cookie");
}

const nodes = [
  Bun.spawn([release, "start"], { cwd: projectDir, env: firstEnvironment, stdout: "inherit", stderr: "inherit" }),
];

const failures: unknown[] = [];

try {
  nodes.push(Bun.spawn([release, "start"], { cwd: projectDir, env: secondEnvironment, stdout: "inherit", stderr: "inherit" }));
  const deadline = Date.now() + 15_000;
  let registered = false;
  while (Date.now() < deadline) {
    if (nodes.some((node) => node.exitCode !== null)) throw new Error("A release node exited during startup");
    const names = await command(["epmd", "-port", epmdPort, "-names"]);
    if (names.stdout.includes(`name ${firstName} `) && names.stdout.includes(`name ${secondName} `)) {
      registered = true;
      break;
    }
    await Bun.sleep(100);
  }
  if (!registered) throw new Error("Release nodes did not register with the task-owned EPMD instance");

  const exchange = await command([release, "rpc", `
    peer = :"${secondNode}"
    connected = Enum.reduce_while(1..100, false, fn _, _ ->
      if peer in Node.list(), do: {:halt, true}, else: (Process.sleep(100); {:cont, false})
    end)
    unless connected, do: raise("libcluster did not discover the second release node")
    unless :rpc.call(peer, Kernel, :node, []) == peer, do: raise("Remote node identity did not match")
    unless is_pid(:rpc.call(peer, Process, :whereis, [BfsElixirReleaseProof.Supervisor])),
      do: raise("The generated application supervisor is not running on its peer")
    unless Keyword.has_key?(Application.fetch_env!(:bfs_elixir_release_proof, :cluster_topologies),
      :configured_hosts), do: raise("Runtime cluster hosts were not configured")
    IO.puts("BFS_CLUSTER_EXCHANGE_PASSED")
  `], firstEnvironment);
  if (exchange.exitCode !== 0 || !exchange.stdout.includes("BFS_CLUSTER_EXCHANGE_PASSED")) {
    throw new Error(`Cluster exchange failed: ${exchange.stderr || exchange.stdout}`);
  }

  const reverse = await command([release, "rpc", `
    unless :"${firstNode}" in Node.list(), do: raise("Peer connection is not bidirectional")
    IO.puts("BFS_CLUSTER_REVERSE_PASSED")
  `], secondEnvironment);
  if (reverse.exitCode !== 0 || !reverse.stdout.includes("BFS_CLUSTER_REVERSE_PASSED")) {
    throw new Error(`Reverse exchange failed: ${reverse.stderr || reverse.stdout}`);
  }
  console.log("Built release rejected a missing cookie and passed bidirectional cluster exchange.");
} catch (failure) {
  failures.push(failure);
} finally {
  await command([release, "stop"], firstEnvironment);
  await command([release, "stop"], secondEnvironment);
  for (const node of nodes) if (node.exitCode === null) node.kill("SIGKILL");
  await Promise.all(nodes.map((node) => node.exited));
  const stoppedEpmd = await command(["epmd", "-port", epmdPort, "-kill"]);
  if (stoppedEpmd.exitCode !== 0) failures.push(new Error(`Task-owned EPMD cleanup failed: ${stoppedEpmd.stderr}`));
}

if (failures.length) throw new AggregateError(failures, "Elixir release cluster proof failed");
