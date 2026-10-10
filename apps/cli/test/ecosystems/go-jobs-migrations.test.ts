import { readVirtualFileContent } from "@test/support/virtual-tree-utils";
import { describe, expect, it } from "bun:test";

import { validateFullConfig } from "@/config/config-validation";
import { createVirtual } from "@/index";
import { planProjectOperation } from "@/operations/project-create";
import { runWithContext } from "@/presentation/context";
import {
  resolveGoMessageQueuePrompt,
  resolveGoMigrationsPrompt,
} from "@/prompts/ecosystems/go-ecosystem";
import { parseStackPartSpecs } from "@/types";

type GoInput = Parameters<typeof createVirtual>[0];

function generateGo(overrides: Partial<GoInput>) {
  return createVirtual({
    projectName: "go-jobs",
    ecosystem: "go",
    goWebFramework: "gin",
    goOrm: "gorm",
    goApi: "none",
    goLogging: "none",
    database: "postgres",
    ...overrides,
  });
}

async function generatedFiles(overrides: Partial<GoInput>, ...paths: string[]) {
  const result = await generateGo(overrides);
  expect(result.error).toBeUndefined();
  expect(result.success).toBe(true);
  return paths.map((path) => readVirtualFileContent(result.tree!.root, path));
}

const RIVER_ROUTES = [
  ["gin", 'r.POST("/api/jobs/welcome-email", gin.WrapF(jobRunner.EnqueueWelcomeEmail))'],
  [
    "echo",
    'e.POST("/api/jobs/welcome-email", echo.WrapHandler(http.HandlerFunc(jobRunner.EnqueueWelcomeEmail)))',
  ],
  [
    "fiber",
    'app.Post("/api/jobs/welcome-email", fiberadaptor.HTTPHandlerFunc(jobRunner.EnqueueWelcomeEmail))',
  ],
  ["chi", 'r.Post("/api/jobs/welcome-email", jobRunner.EnqueueWelcomeEmail)'],
  ["stdlib", 'mux.HandleFunc("POST /api/jobs/welcome-email", jobRunner.EnqueueWelcomeEmail)'],
] as const;

describe("Go background jobs", () => {
  it("wires River's worker, client, migration, and enqueue route into every supported server", async () => {
    for (const [goWebFramework, route] of RIVER_ROUTES) {
      const [main, river, goMod] = await generatedFiles(
        { goWebFramework, goMessageQueue: "river" },
        "cmd/server/main.go",
        "internal/jobs/river.go",
        "go.mod",
      );
      expect(main).toContain("jobRunner, err := jobs.Start()");
      expect(main).toContain(route);
      expect(river).toContain("river.AddWorker(workers, &WelcomeEmailWorker{})");
      expect(river).toContain("migrator.Migrate(ctx, rivermigrate.DirectionUp, nil)");
      expect(river).toContain("r.client.Insert(req.Context(), args, nil)");
      expect(river).toContain("req.Body = http.MaxBytesReader(w, req.Body, maxEnqueueBodyBytes)");
      expect(river).toContain("len(args.Email) > maxEmailLength");
      expect(goMod).toContain("github.com/riverqueue/river v0.49.0");
      expect(goMod).toContain("github.com/riverqueue/river/riverdriver/riverpgxv5 v0.49.0");
      expect(goMod).toContain("go 1.26.0");
    }
  });

  it("stops jobs on shutdown through the server's own lifecycle when it has one", async () => {
    const [ginMain, ginSignals] = await generatedFiles(
      { goMessageQueue: "gocron" },
      "cmd/server/main.go",
      "internal/jobs/signals.go",
    );
    expect(ginMain).toContain("jobs.StopOnSignal(jobRunner)");
    expect(ginSignals).toContain("runner.Stop()");

    const result = await generateGo({ goWebFramework: "stdlib", goMessageQueue: "gocron" });
    const stdlibMain = readVirtualFileContent(result.tree!.root, "cmd/server/main.go");
    expect(stdlibMain).toContain("defer jobRunner.Stop()");
    expect(stdlibMain).not.toContain("StopOnSignal");
    expect(stdlibMain).not.toContain("/api/jobs/welcome-email");
    expect(() => readVirtualFileContent(result.tree!.root, "internal/jobs/signals.go")).toThrow();
  });

  it("schedules a gocron job without requiring PostgreSQL", async () => {
    const [gocron, goMod] = await generatedFiles(
      { database: "sqlite", goOrm: "gorm", goMessageQueue: "gocron" },
      "internal/jobs/gocron.go",
      "go.mod",
    );
    expect(gocron).toContain("gocron.DurationJob(time.Minute)");
    expect(gocron).toContain("r.scheduler.Shutdown()");
    expect(goMod).toContain("github.com/go-co-op/gocron/v2 v2.22.0");
    expect(goMod).toContain("go 1.25.0");
  });

  it("offers only compatible job options in prompts", () => {
    const values = (selection: Parameters<typeof resolveGoMessageQueuePrompt>[1]) =>
      resolveGoMessageQueuePrompt(undefined, selection).options.map((option) => option.value);
    expect(values({ database: "postgres", goWebFramework: "gin" })).toEqual(
      expect.arrayContaining(["river", "gocron"]),
    );
    expect(values({ database: "sqlite", goWebFramework: "gin" })).not.toContain("river");
    expect(values({ database: "sqlite", goWebFramework: "gin" })).toContain("gocron");
    expect(values({ database: "postgres", goWebFramework: "go-zero" })).not.toContain("gocron");
    expect(
      resolveGoMigrationsPrompt(undefined, { database: "mysql", goOrm: "sqlc" }).options.map(
        (option) => option.value,
      ),
    ).toEqual(["golang-migrate", "goose", "none"]);
  });
});

describe("Go migrations", () => {
  it("renders a goose command with the selected driver and an embedded initial migration", async () => {
    const cases = [
      ["postgres", '_ "github.com/jackc/pgx/v5/stdlib"', 'sql.Open("pgx"', "BIGSERIAL"],
      ["mysql", '_ "github.com/go-sql-driver/mysql"', 'sql.Open("mysql"', "AUTO_INCREMENT"],
      ["sqlite", '_ "github.com/mattn/go-sqlite3"', 'sql.Open("sqlite3"', "AUTOINCREMENT"],
    ] as const;
    for (const [database, driverImport, open, sql] of cases) {
      const [command, migration, embed, goMod] = await generatedFiles(
        { database, goOrm: database === "mysql" ? "sqlx" : "gorm", goMigrations: "goose" },
        "cmd/migrate/main.go",
        "migrations/00001_create_users.sql",
        "migrations/migrations.go",
        "go.mod",
      );
      expect(command).toContain(driverImport);
      expect(command).toContain(open);
      expect(command).toContain('os.Getenv("DATABASE_URL")');
      expect(command).toContain('goose.RunContext(context.Background(), command, db, ".", args...)');
      expect(migration).toContain("-- +goose Up");
      expect(migration).toContain("-- +goose Down");
      expect(migration).toContain(sql);
      expect(migration).toContain("CONSTRAINT uni_users_email UNIQUE (email)");
      expect(migration).toContain(
        "CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE",
      );
      expect(migration.indexOf("DROP TABLE IF EXISTS posts;")).toBeLessThan(
        migration.indexOf("DROP TABLE IF EXISTS users;"),
      );
      expect(embed).toContain("//go:embed *.sql");
      expect(goMod).toContain("github.com/pressly/goose/v3 v3.28.0");
    }
  });

  it("points Atlas at each ORM's schema source", async () => {
    const [gormAtlas, loader, goMod] = await generatedFiles(
      { goOrm: "gorm", goMigrations: "atlas" },
      "atlas.hcl",
      "cmd/atlas-loader/main.go",
      "go.mod",
    );
    expect(gormAtlas).toContain('program = ["go", "run", "-mod=mod", "./cmd/atlas-loader"]');
    expect(gormAtlas).toContain("src = data.external_schema.gorm.url");
    expect(gormAtlas).toContain('dev = "docker://postgres/17/dev?search_path=public"');
    expect(loader).toContain('gormschema.New("postgres").Load(&models.User{}, &models.Post{})');
    expect(goMod).toContain("ariga.io/atlas-provider-gorm v0.6.1");

    const [entAtlas, entGoMod] = await generatedFiles(
      { goOrm: "ent", goMigrations: "atlas" },
      "atlas.hcl",
      "go.mod",
    );
    expect(entAtlas).toContain('src = "ent://ent/schema"');
    expect(entGoMod).toContain("entgo.io/ent v0.14.6");
    const [sqlcAtlas] = await generatedFiles({ goOrm: "sqlc", goMigrations: "atlas" }, "atlas.hcl");
    expect(sqlcAtlas).toContain('src = "file://sql/schema"');
    const [bunAtlas, schema, env] = await generatedFiles(
      { goOrm: "bun", database: "sqlite", goMigrations: "atlas" },
      "atlas.hcl",
      "schema.sql",
      ".env.example",
    );
    expect(bunAtlas).toContain('src = "file://schema.sql"');
    expect(bunAtlas).toContain('dev = "sqlite://dev?mode=memory"');
    expect(bunAtlas).toContain('url = getenv("ATLAS_DATABASE_URL")');
    expect(schema).toContain("CREATE TABLE posts");
    expect(env).toContain("ATLAS_DATABASE_URL=sqlite://app.db");
  });
});

describe("Go job and migration rejections", () => {
  const rejected = [
    {
      reason: "River requires PostgreSQL",
      flat: { database: "sqlite", goMessageQueue: "river" },
      part: ["backend:go:gin", "backend.jobQueue:go:river", "database:universal:sqlite"],
    },
    {
      reason: "gocron is wired for Gin, Echo, Fiber, Chi, and net/http servers",
      flat: { goWebFramework: "kratos", goMessageQueue: "gocron" },
      part: ["backend:go:kratos", "backend.jobQueue:go:gocron", "database:universal:postgres"],
    },
    {
      reason: "Atlas loads the sqlc schema, which is PostgreSQL-only",
      flat: { database: "mysql", goOrm: "sqlc", goMigrations: "atlas" },
      part: [
        "backend:go:gin",
        "backend.orm:go:sqlc",
        "backend.migrations:go:atlas",
        "database:universal:mysql",
      ],
    },
    {
      reason: "Go migrations require SQLite, PostgreSQL, or MySQL",
      flat: { database: "none", goOrm: "none", goMigrations: "goose" },
      part: ["backend:go:gin", "backend.migrations:go:goose"],
    },
  ] as const;

  it("rejects each restricted option with one shared reason on every input path", async () => {
    for (const { reason, flat, part } of rejected) {
      expect(() =>
        runWithContext({ silent: true }, () =>
          validateFullConfig(
            { ecosystem: "go", goWebFramework: "gin", goOrm: "gorm", ...flat },
            new Set(["ecosystem", ...Object.keys(flat)]),
            {} as never,
          ),
        ),
      ).toThrow(reason);

      const flatResult = await generateGo(flat);
      expect(flatResult.success).toBe(false);
      expect(flatResult.error).toContain(reason);

      const graphResult = await createVirtual({
        projectName: "go-jobs-graph",
        ecosystem: "go",
        stackParts: parseStackPartSpecs([...part]),
      });
      expect(graphResult.success).toBe(false);
      expect(graphResult.error).toContain(reason);

      await expect(planProjectOperation.invoke({ ecosystem: "go", part: [...part] })).rejects.toThrow(
        reason,
      );
      await expect(
        planProjectOperation.invoke({ ecosystem: "go", goWebFramework: "gin", goOrm: "gorm", ...flat }),
      ).rejects.toThrow(reason);
    }
  });
});
