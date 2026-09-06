export function collectEntryAssets(manifest) {
  const entryKeys = Object.keys(manifest).filter(
    (key) => manifest[key].isEntry && manifest[key].file.endsWith(".js"),
  );
  if (entryKeys.length === 0) throw new Error("Client manifest has no JavaScript entry");

  const visited = new Set();
  const js = new Set();
  const css = new Set();
  const visit = (key) => {
    if (visited.has(key)) return;
    const chunk = manifest[key];
    if (!chunk) throw new Error(`Missing static dependency in client manifest: ${key}`);
    visited.add(key);
    js.add(chunk.file);
    for (const file of chunk.css ?? []) css.add(file);
    for (const dependency of chunk.imports ?? []) visit(dependency);
  };
  for (const key of entryKeys) visit(key);

  return { js: [...js].sort(), css: [...css].sort() };
}
