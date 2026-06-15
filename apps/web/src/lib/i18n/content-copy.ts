import type { BlogFrontmatter, BlogPost } from "@/lib/blog/source";
import type { TocEntry } from "@/lib/docs/remark-extract-toc";
import type { GuideFrontmatter, GuidePage } from "@/lib/guides/source";
import { getLocale } from "@/paraglide/runtime.js";

type ContentLocale = "en" | "es" | "zh";
type LocalizedText = Record<Exclude<ContentLocale, "en">, string>;

function currentContentLocale(): ContentLocale {
  const locale = getLocale();
  return locale === "es" || locale === "zh" ? locale : "en";
}

const TITLE_TRANSLATIONS: Record<string, LocalizedText> = {
  "blog:scaffbench": {
    es: "ScaffBench: midiendo agentes de codigo en scaffolding fullstack real",
    zh: "ScaffBench：在真实全栈脚手架任务中衡量编程代理",
  },
  "guide:": {
    es: "Guias de starters fullstack",
    zh: "全栈应用 Starter 指南",
  },
  "guide:ai/nextjs-ai-cli-agent-workbench": {
    es: "Workbench de agentes CLI de IA con Next.js",
    zh: "Next.js AI CLI 代理工作台",
  },
  "guide:packs": {
    es: "Starter packs de Better Fullstack",
    zh: "Better Fullstack Starter Pack",
  },
  "guide:packs/create-ai-agent-app": {
    es: "Crear una app de agente de IA",
    zh: "创建 AI 代理应用",
  },
  "guide:packs/create-internal-tool": {
    es: "Crear una herramienta interna",
    zh: "创建内部工具",
  },
  "guide:packs/create-java-api": {
    es: "Crear una API Java",
    zh: "创建 Java API",
  },
  "guide:packs/create-mobile-app": {
    es: "Crear una app movil",
    zh: "创建移动应用",
  },
  "guide:packs/create-rest-api": {
    es: "Crear una REST API",
    zh: "创建 REST API",
  },
  "guide:packs/create-rust-backend": {
    es: "Crear un backend Rust",
    zh: "创建 Rust 后端",
  },
  "guide:packs/create-saas-app": {
    es: "Crear una app SaaS",
    zh: "创建 SaaS 应用",
  },
  "guide:go/bubbletea-cli": {
    es: "CLI Go con Bubble Tea",
    zh: "使用 Bubble Tea 的 Go CLI",
  },
  "guide:go/echo-sqlc-api": {
    es: "Echo con SQLC",
    zh: "Echo 与 SQLC",
  },
  "guide:go/gin-postgres-gorm": {
    es: "Gin con PostgreSQL y GORM",
    zh: "Gin 与 PostgreSQL 和 GORM",
  },
  "guide:go/grpc-go-service": {
    es: "Servicio gRPC Go",
    zh: "Go gRPC 服务",
  },
  "guide:java/spring-boot-postgres-jpa": {
    es: "Spring Boot con PostgreSQL y JPA",
    zh: "Spring Boot 与 PostgreSQL 和 JPA",
  },
  "guide:java/spring-security-api": {
    es: "API Spring Boot segura",
    zh: "安全的 Spring Boot API",
  },
  "guide:python/django-rest-api": {
    es: "Starter de Django REST API",
    zh: "Django REST API Starter",
  },
  "guide:python/fastapi-langchain-ai-agent": {
    es: "Agente de IA FastAPI con LangChain",
    zh: "使用 LangChain 的 FastAPI AI 代理",
  },
  "guide:python/fastapi-postgres-sqlalchemy": {
    es: "FastAPI con PostgreSQL y SQLAlchemy",
    zh: "FastAPI 与 PostgreSQL 和 SQLAlchemy",
  },
  "guide:react-native/expo-uniwind-native": {
    es: "App nativa Expo con Uniwind",
    zh: "Expo Uniwind 原生应用",
  },
  "guide:rust/axum-leptos-fullstack": {
    es: "Rust fullstack con Axum y Leptos",
    zh: "Axum 与 Leptos 全栈 Rust",
  },
  "guide:rust/axum-postgres-seaorm": {
    es: "Axum con PostgreSQL y SeaORM",
    zh: "Axum 与 PostgreSQL 和 SeaORM",
  },
  "guide:rust/ratatui-cli": {
    es: "CLI Rust con Ratatui",
    zh: "使用 Ratatui 的 Rust CLI",
  },
  "guide:rust/tonic-sqlx-grpc-service": {
    es: "Servicio gRPC Rust con Tonic y SQLx",
    zh: "使用 Tonic 和 SQLx 的 Rust gRPC 服务",
  },
  "guide:typescript/astro-react-hono": {
    es: "Astro con React y Hono",
    zh: "Astro 与 React 和 Hono",
  },
  "guide:typescript/create-tanstack-start-project": {
    es: "Crear un proyecto TanStack Start",
    zh: "创建 TanStack Start 项目",
  },
  "guide:typescript/hono-trpc-drizzle": {
    es: "Hono con tRPC y Drizzle",
    zh: "Hono 与 tRPC 和 Drizzle",
  },
  "guide:typescript/nextjs-drizzle-better-auth": {
    es: "Next.js con Drizzle y Better Auth",
    zh: "Next.js 与 Drizzle 和 Better Auth",
  },
  "guide:typescript/nuxt-prisma-better-auth": {
    es: "Nuxt con Prisma y Better Auth",
    zh: "Nuxt 与 Prisma 和 Better Auth",
  },
  "guide:typescript/qwik-city-app": {
    es: "Starter de Qwik City App",
    zh: "Qwik City App Starter",
  },
  "guide:typescript/solidstart-orpc-drizzle": {
    es: "SolidStart con oRPC y Drizzle",
    zh: "SolidStart 与 oRPC 和 Drizzle",
  },
  "guide:typescript/sveltekit-hono-drizzle": {
    es: "SvelteKit con Hono y Drizzle",
    zh: "SvelteKit 与 Hono 和 Drizzle",
  },
  "guide:typescript/tanstack-start-resend": {
    es: "TanStack Start y Resend",
    zh: "TanStack Start 与 Resend",
  },
};

const DESCRIPTION_TRANSLATIONS: Record<string, LocalizedText> = {
  "blog:scaffbench": {
    es: "102 ejecuciones en Claude Code, Codex CLI, Gemini CLI, Kilo y opencode: quince modelos y tres rutas de creacion. Medimos tiempo, tokens de salida, coste y si el proyecto generado realmente instala y compila.",
    zh: "102 次运行，覆盖 Claude Code、Codex CLI、Gemini CLI、Kilo 和 opencode：十五个模型，三种创建路径。我们衡量耗时、输出 token、成本，以及生成项目是否真的能安装并构建。",
  },
  "guide:": {
    es: "Guias practicas de Better Fullstack para proyectos starter de TypeScript, React Native, Rust, Python, Go, Java e IA.",
    zh: "面向 TypeScript、React Native、Rust、Python、Go、Java 和 AI starter 项目的 Better Fullstack 实用指南。",
  },
  "guide:packs": {
    es: "Guias de starter packs enfocadas en SEO para crear apps SaaS, apps de agentes de IA, REST APIs, APIs Java, backends Rust, apps moviles y herramientas internas con Better Fullstack.",
    zh: "面向 SEO 的 starter pack 指南，用 Better Fullstack 创建 SaaS 应用、AI 代理应用、REST API、Java API、Rust 后端、移动应用和内部工具。",
  },
};

const SUBJECT_TRANSLATIONS: Record<string, LocalizedText> = {
  "AI agent app": { es: "una app de agente de IA", zh: "AI 代理应用" },
  "Expo native app": { es: "una app nativa Expo", zh: "Expo 原生应用" },
  "Go API project": { es: "un proyecto API Go", zh: "Go API 项目" },
  "Go backend": { es: "un backend Go", zh: "Go 后端" },
  "Go terminal application": { es: "una aplicacion de terminal Go", zh: "Go 终端应用" },
  "Java API": { es: "una API Java", zh: "Java API" },
  "Java API project": { es: "un proyecto API Java", zh: "Java API 项目" },
  "Next.js app": { es: "una app Next.js", zh: "Next.js 应用" },
  "Nuxt fullstack app": { es: "una app fullstack Nuxt", zh: "Nuxt 全栈应用" },
  "Python AI API": { es: "una API Python de IA", zh: "Python AI API" },
  "Python API project": { es: "un proyecto API Python", zh: "Python API 项目" },
  "Python backend": { es: "un backend Python", zh: "Python 后端" },
  "Qwik City app": { es: "una app Qwik City", zh: "Qwik City 应用" },
  "REST API": { es: "una REST API", zh: "REST API" },
  "Rust API project": { es: "un proyecto API Rust", zh: "Rust API 项目" },
  "Rust backend": { es: "un backend Rust", zh: "Rust 后端" },
  "Rust gRPC service": { es: "un servicio gRPC Rust", zh: "Rust gRPC 服务" },
  "Rust terminal UI app": { es: "una app TUI Rust", zh: "Rust 终端 UI 应用" },
  "SaaS app": { es: "una app SaaS", zh: "SaaS 应用" },
  "SolidStart fullstack app": { es: "una app fullstack SolidStart", zh: "SolidStart 全栈应用" },
  "SvelteKit app": { es: "una app SvelteKit", zh: "SvelteKit 应用" },
  "TanStack Start app": { es: "una app TanStack Start", zh: "TanStack Start 应用" },
  "TanStack Start fullstack app": {
    es: "una app fullstack TanStack Start",
    zh: "TanStack Start 全栈应用",
  },
  "TypeScript fullstack app": { es: "una app fullstack TypeScript", zh: "TypeScript 全栈应用" },
  "Astro app": { es: "una app Astro", zh: "Astro 应用" },
  "fullstack Rust app": { es: "una app fullstack Rust", zh: "Rust 全栈应用" },
  "internal tool": { es: "una herramienta interna", zh: "内部工具" },
  "mobile app": { es: "una app movil", zh: "移动应用" },
  "secure Java API": { es: "una API Java segura", zh: "安全的 Java API" },
};

const HEADING_TRANSLATIONS: Record<string, LocalizedText> = {
  "Adding an API later": { es: "Anadir una API mas tarde", zh: "稍后添加 API" },
  "Appendix: all 102 runs": { es: "Apendice: las 102 ejecuciones", zh: "附录：全部 102 次运行" },
  "Backend language guides": { es: "Guias de lenguajes backend", zh: "后端语言指南" },
  "Claude sweep (Claude Code, June 12)": {
    es: "Barrido Claude (Claude Code, 12 de junio)",
    zh: "Claude 批测（Claude Code，6 月 12 日）",
  },
  "CLI and UI examples": { es: "Ejemplos de CLI y UI", zh: "CLI 与 UI 示例" },
  "Common use cases": { es: "Casos de uso comunes", zh: "常见用例" },
  "Compatibility notes": { es: "Notas de compatibilidad", zh: "兼容性说明" },
  "Comparison notes": { es: "Notas de comparacion", zh: "对比说明" },
  Cost: { es: "Coste", zh: "成本" },
  "Database model example": { es: "Ejemplo de modelo de base de datos", zh: "数据库模型示例" },
  "Deployment notes": { es: "Notas de despliegue", zh: "部署说明" },
  "Example agent instruction": { es: "Ejemplo de instruccion para agentes", zh: "代理指令示例" },
  "Example application model": { es: "Ejemplo de modelo de aplicacion", zh: "应用模型示例" },
  "Example Astro island": { es: "Ejemplo de isla Astro", zh: "Astro island 示例" },
  "Example Drizzle model": { es: "Ejemplo de modelo Drizzle", zh: "Drizzle 模型示例" },
  "Example email helper": { es: "Ejemplo de helper de email", zh: "邮件 helper 示例" },
  "Example Hono endpoint": { es: "Ejemplo de endpoint Hono", zh: "Hono endpoint 示例" },
  "Example Hono route": { es: "Ejemplo de ruta Hono", zh: "Hono 路由示例" },
  "Example oRPC contract shape": { es: "Ejemplo de contrato oRPC", zh: "oRPC 合约形状示例" },
  "Example route": { es: "Ejemplo de ruta", zh: "路由示例" },
  "Example route and API pattern": { es: "Ejemplo de patron de ruta y API", zh: "路由与 API 模式示例" },
  "Example route component": { es: "Ejemplo de componente de ruta", zh: "路由组件示例" },
  "Example route usage": { es: "Ejemplo de uso de ruta", zh: "路由使用示例" },
  "Example screen": { es: "Pantalla de ejemplo", zh: "示例界面" },
  "Example SvelteKit call pattern": {
    es: "Ejemplo de patron de llamada SvelteKit",
    zh: "SvelteKit 调用模式示例",
  },
  "Example tRPC procedure shape": {
    es: "Ejemplo de forma de procedimiento tRPC",
    zh: "tRPC procedure 形状示例",
  },
  "Example typed procedure": { es: "Ejemplo de procedimiento tipado", zh: "类型化 procedure 示例" },
  "First things to customize": { es: "Primeras cosas para personalizar", zh: "首先要自定义的内容" },
  "Generated shape": { es: "Estructura generada", zh: "生成后的结构" },
  "Generate the AI agent starter": { es: "Generar el starter de agente de IA", zh: "生成 AI 代理 starter" },
  "Generate the internal tool starter": {
    es: "Generar el starter de herramienta interna",
    zh: "生成内部工具 starter",
  },
  "Generate the Java API starter": { es: "Generar el starter de API Java", zh: "生成 Java API starter" },
  "Generate the mobile starter": { es: "Generar el starter movil", zh: "生成移动 starter" },
  "Generate the REST API starter": { es: "Generar el starter REST API", zh: "生成 REST API starter" },
  "Generate the Rust backend starter": {
    es: "Generar el starter de backend Rust",
    zh: "生成 Rust 后端 starter",
  },
  "Generate the SaaS starter": { es: "Generar el starter SaaS", zh: "生成 SaaS starter" },
  "GPT models on Codex CLI": { es: "Modelos GPT en Codex CLI", zh: "Codex CLI 上的 GPT 模型" },
  "GPT sweep (Codex CLI, June 10 — pre-fix generator)": {
    es: "Barrido GPT (Codex CLI, 10 de junio — generador previo al fix)",
    zh: "GPT 批测（Codex CLI，6 月 10 日，修复前生成器）",
  },
  "Handler and model examples": { es: "Ejemplos de handler y modelo", zh: "Handler 与模型示例" },
  "Headline results": { es: "Resultados principales", zh: "核心结果" },
  "How the AI pieces fit": { es: "Como encajan las piezas de IA", zh: "AI 组件如何配合" },
  "Light sweep (Gemini CLI / Kilo / opencode, June 12 — light-ts only)": {
    es: "Barrido ligero (Gemini CLI / Kilo / opencode, 12 de junio — solo light-ts)",
    zh: "轻量批测（Gemini CLI / Kilo / opencode，6 月 12 日，仅 light-ts）",
  },
  "MCP keeps agents on rails": { es: "MCP mantiene a los agentes encaminados", zh: "MCP 让代理保持在轨道上" },
  "Methodology": { es: "Metodologia", zh: "方法" },
  "Migrations and tests": { es: "Migraciones y pruebas", zh: "迁移与测试" },
  "Model and update examples": { es: "Ejemplos de modelo y update", zh: "模型与 update 示例" },
  "Model character": { es: "Caracter de los modelos", zh: "模型特征" },
  "Next steps": { es: "Siguientes pasos", zh: "后续步骤" },
  "Pack selection notes": { es: "Notas para elegir pack", zh: "Pack 选择说明" },
  "Per model and path": { es: "Por modelo y ruta", zh: "按模型和路径" },
  "Project boundaries": { es: "Limites del proyecto", zh: "项目边界" },
  "Prompt-only agents drown in the heavy spec": {
    es: "Los agentes solo con prompt se ahogan en la spec pesada",
    zh: "纯 prompt 代理会被重型规格淹没",
  },
  "Proto and service examples": { es: "Ejemplos de proto y servicio", zh: "Proto 与服务示例" },
  "Qualitative analysis": { es: "Analisis cualitativo", zh: "定性分析" },
  "Query and handler examples": { es: "Ejemplos de query y handler", zh: "查询与 handler 示例" },
  "React Native guides": { es: "Guias de React Native", zh: "React Native 指南" },
  "Representative file tree": { es: "Arbol de archivos representativo", zh: "代表性文件树" },
  "Representative snippets": { es: "Snippets representativos", zh: "代表性片段" },
  Results: { es: "Resultados", zh: "结果" },
  "Route and model examples": { es: "Ejemplos de ruta y modelo", zh: "路由与模型示例" },
  "Server and UI examples": { es: "Ejemplos de servidor y UI", zh: "服务端与 UI 示例" },
  "Starter pack guides": { es: "Guias de starter packs", zh: "Starter pack 指南" },
  "Testing and deployment notes": { es: "Notas de pruebas y despliegue", zh: "测试与部署说明" },
  "The benchmark audited our own templates": {
    es: "El benchmark audito nuestras propias plantillas",
    zh: "这个 benchmark 也审计了我们自己的模板",
  },
  "The four project specs": { es: "Las cuatro specs de proyecto", zh: "四个项目规格" },
  "The harness": { es: "El harness", zh: "测试框架" },
  "The light sweep: Gemini, Kilo, and opencode": {
    es: "El barrido ligero: Gemini, Kilo y opencode",
    zh: "轻量批测：Gemini、Kilo 和 opencode",
  },
  "The three creation paths": { es: "Las tres rutas de creacion", zh: "三种创建路径" },
  "Tradeoffs": { es: "Tradeoffs", zh: "取舍" },
  "Troubleshooting": { es: "Solucion de problemas", zh: "故障排查" },
  "TypeScript guides": { es: "Guias de TypeScript", zh: "TypeScript 指南" },
  "Use the visual builder": { es: "Usar el constructor visual", zh: "使用可视化构建器" },
  "Verification": { es: "Verificacion", zh: "验证" },
  "What counts as a failure": { es: "Que cuenta como fallo", zh: "什么算失败" },
  "What counts as passing": { es: "Que cuenta como aprobado", zh: "什么算通过" },
  "What the pack includes": { es: "Que incluye el pack", zh: "Pack 包含什么" },
  "What this creates": { es: "Que crea esto", zh: "它会创建什么" },
  "When this is the right pack": { es: "Cuando este pack es el adecuado", zh: "何时选择这个 pack" },
  "When to choose it": { es: "Cuando elegirlo", zh: "何时选择它" },
  "Why Drizzle and Better Auth": { es: "Por que Drizzle y Better Auth", zh: "为什么选择 Drizzle 和 Better Auth" },
};

function keyFor(kind: "blog" | "guide", slug: readonly string[]) {
  return `${kind}:${slug.join("/")}`;
}

function translated(value: string, map: Record<string, LocalizedText>, locale = currentContentLocale()) {
  if (locale === "en") return value;
  return map[value]?.[locale] ?? value;
}

function translateSubject(subject: string, locale: Exclude<ContentLocale, "en">) {
  return SUBJECT_TRANSLATIONS[subject]?.[locale] ?? subject;
}

function translateGuideDescription(description: string, locale = currentContentLocale()) {
  if (locale === "en") return description;

  const learnMatch = description.match(/^Learn how to create a (.+?) with (.+?) using Better Fullstack\.$/);
  if (learnMatch) {
    const subject = translateSubject(learnMatch[1], locale);
    const stack = learnMatch[2];
    return locale === "es"
      ? `Aprende a crear ${subject} con ${stack} usando Better Fullstack.`
      : `学习如何使用 Better Fullstack 创建包含 ${stack} 的${subject}。`;
  }

  const createWithBfsMatch = description.match(/^Create an? (.+?) with (.+?) using Better Fullstack(?:'s .+?)?\.$/);
  if (createWithBfsMatch) {
    const subject = translateSubject(createWithBfsMatch[1], locale);
    const stack = createWithBfsMatch[2];
    return locale === "es"
      ? `Crea ${subject} con ${stack} usando Better Fullstack.`
      : `使用 Better Fullstack 创建包含 ${stack} 的${subject}。`;
  }

  const createMinimalMatch = description.match(
    /^Create an? (.+?) with (.+?) and a minimal Better Fullstack configuration for (.+?)\.$/,
  );
  if (createMinimalMatch) {
    const subject = translateSubject(createMinimalMatch[1], locale);
    const stack = createMinimalMatch[2];
    const purpose = createMinimalMatch[3];
    return locale === "es"
      ? `Crea ${subject} con ${stack} y una configuracion minima de Better Fullstack para ${purpose}.`
      : `创建包含 ${stack} 的${subject}，并使用面向 ${purpose} 的最小 Better Fullstack 配置。`;
  }

  const createWithMatch = description.match(/^Create an? (.+?) with (.+?)\.$/);
  if (createWithMatch) {
    const subject = translateSubject(createWithMatch[1], locale);
    const stack = createWithMatch[2];
    return locale === "es" ? `Crea ${subject} con ${stack}.` : `创建包含 ${stack} 的${subject}。`;
  }

  return description;
}

function localizeFrontmatter<T extends BlogFrontmatter | GuideFrontmatter>(
  kind: "blog" | "guide",
  slug: readonly string[],
  frontmatter: T,
): T {
  const locale = currentContentLocale();
  if (locale === "en") return frontmatter;

  const key = keyFor(kind, slug);
  const title = TITLE_TRANSLATIONS[key]?.[locale] ?? frontmatter.title;
  const description =
    DESCRIPTION_TRANSLATIONS[key]?.[locale] ??
    (frontmatter.description
      ? translateGuideDescription(frontmatter.description, locale)
      : frontmatter.description);

  return {
    ...frontmatter,
    title,
    description,
  };
}

export function localizeBlogFrontmatter(
  slug: readonly string[],
  frontmatter: BlogFrontmatter,
): BlogFrontmatter {
  return localizeFrontmatter("blog", slug, frontmatter);
}

export function localizeGuideFrontmatter(
  slug: readonly string[],
  frontmatter: GuideFrontmatter,
): GuideFrontmatter {
  const localized = localizeFrontmatter("guide", slug, frontmatter);
  const locale = currentContentLocale();
  if (locale === "en") return localized;

  const categoryTranslations: Record<string, LocalizedText> = {
    "AI Tools": { es: "Herramientas de IA", zh: "AI 工具" },
    Guides: { es: "Guias", zh: "指南" },
    Packs: { es: "Packs", zh: "套件" },
  };

  return {
    ...localized,
    category: localized.category
      ? (categoryTranslations[localized.category]?.[locale] ?? localized.category)
      : localized.category,
  };
}

export function localizeBlogPost<T extends BlogPost>(post: T): T {
  return {
    ...post,
    frontmatter: localizeBlogFrontmatter(post.slug, post.frontmatter),
  };
}

export function localizeGuidePage<T extends GuidePage>(page: T): T {
  return {
    ...page,
    frontmatter: localizeGuideFrontmatter(page.slug, page.frontmatter),
  };
}

export function localizeContentHeading(value: string): string {
  return translated(value, HEADING_TRANSLATIONS);
}

export function localizeTocEntries(entries: readonly TocEntry[]): TocEntry[] {
  return entries.map((entry) => ({
    ...entry,
    text: localizeContentHeading(entry.text),
  }));
}
