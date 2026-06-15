import { getLocale } from "@/paraglide/runtime.js";

type Locale = "en" | "es" | "zh";
type LocalizedMap = Partial<Record<Locale, string>>;

type PresetTemplate = {
  id: string;
  name: string;
  description: string;
};

type TechOption = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  default?: boolean;
  legacy?: boolean;
  isNew?: boolean;
  className?: string;
};

const CATEGORY_NAMES: Record<string, LocalizedMap> = {
  api: { es: "Capa API", zh: "API 层" },
  webFrontend: { es: "Frontend web", zh: "Web 前端" },
  nativeFrontend: { es: "Frontend móvil", zh: "移动前端" },
  runtime: { es: "Runtime", zh: "运行时" },
  backend: { es: "Backend", zh: "后端" },
  database: { es: "Base de datos", zh: "数据库" },
  orm: { es: "ORM / Base de datos", zh: "ORM / 数据库" },
  auth: { es: "Autenticación", zh: "认证" },
  payments: { es: "Pagos", zh: "支付" },
  email: { es: "Email", zh: "邮件" },
  fileUpload: { es: "Subida de archivos", zh: "文件上传" },
  logging: { es: "Logs", zh: "日志" },
  observability: { es: "Observabilidad", zh: "可观测性" },
  rateLimit: { es: "Límites de tasa", zh: "速率限制" },
  featureFlags: { es: "Feature flags", zh: "功能开关" },
  analytics: { es: "Analítica", zh: "分析" },
  backendLibraries: { es: "Librerías backend", zh: "后端库" },
  stateManagement: { es: "Estado", zh: "状态管理" },
  forms: { es: "Formularios", zh: "表单" },
  validation: { es: "Validación", zh: "校验" },
  testing: { es: "Pruebas", zh: "测试" },
  animation: { es: "Animación", zh: "动画" },
  cssFramework: { es: "Framework CSS", zh: "CSS 框架" },
  uiLibrary: { es: "Librería UI", zh: "UI 库" },
  appPlatforms: { es: "Plataformas de app", zh: "应用平台" },
  packageManager: { es: "Gestor de paquetes", zh: "包管理器" },
  versionChannel: { es: "Canal de versión", zh: "版本通道" },
  git: { es: "Git", zh: "Git" },
  install: { es: "Instalación", zh: "安装" },
  i18n: { es: "Internacionalización (i18n)", zh: "国际化 (i18n)" },
  cms: { es: "CMS", zh: "CMS" },
  search: { es: "Búsqueda", zh: "搜索" },
  fileStorage: { es: "Almacenamiento de archivos", zh: "文件存储" },
  mobileNavigation: { es: "Navegación móvil", zh: "移动导航" },
  mobileUI: { es: "UI móvil", zh: "移动 UI" },
  mobileStorage: { es: "Almacenamiento móvil", zh: "移动存储" },
  mobileTesting: { es: "Pruebas móviles", zh: "移动测试" },
  mobilePush: { es: "Push móvil", zh: "移动推送" },
  mobileOTA: { es: "Actualizaciones OTA", zh: "OTA 更新" },
  mobileDeepLinking: { es: "Deep linking móvil", zh: "移动深链" },
  rustWebFramework: { es: "Framework web Rust", zh: "Rust Web 框架" },
  rustFrontend: { es: "Frontend Rust (WASM)", zh: "Rust 前端 (WASM)" },
  rustOrm: { es: "ORM / base de datos Rust", zh: "Rust ORM / 数据库" },
  rustApi: { es: "Capa API Rust", zh: "Rust API 层" },
  rustCli: { es: "Herramientas CLI Rust", zh: "Rust CLI 工具" },
  pythonWebFramework: { es: "Framework web Python", zh: "Python Web 框架" },
  pythonOrm: { es: "ORM / base de datos Python", zh: "Python ORM / 数据库" },
  pythonAi: { es: "IA / ML Python", zh: "Python AI / ML" },
  pythonApi: { es: "Framework API Python", zh: "Python API 框架" },
  pythonTaskQueue: { es: "Cola de tareas Python", zh: "Python 任务队列" },
  goWebFramework: { es: "Framework web Go", zh: "Go Web 框架" },
  goOrm: { es: "ORM / base de datos Go", zh: "Go ORM / 数据库" },
  goApi: { es: "Capa API Go", zh: "Go API 层" },
  goCli: { es: "Herramientas CLI Go", zh: "Go CLI 工具" },
  javaWebFramework: { es: "Framework web Java", zh: "Java Web 框架" },
  javaBuildTool: { es: "Herramienta de build Java", zh: "Java 构建工具" },
  javaOrm: { es: "ORM / base de datos Java", zh: "Java ORM / 数据库" },
  javaAuth: { es: "Auth Java", zh: "Java 认证" },
  elixirWebFramework: { es: "Framework web Elixir", zh: "Elixir Web 框架" },
  elixirOrm: { es: "ORM / base de datos Elixir", zh: "Elixir ORM / 数据库" },
  elixirAuth: { es: "Auth Elixir", zh: "Elixir 认证" },
  dotnetWebFramework: { es: "Framework web .NET", zh: ".NET Web 框架" },
  dotnetOrm: { es: "ORM / base de datos .NET", zh: ".NET ORM / 数据库" },
  dotnetApi: { es: "Capa API .NET", zh: ".NET API 层" },
  dotnetAuth: { es: "Auth .NET", zh: ".NET 认证" },
  astroIntegration: { es: "Integración de Astro", zh: "Astro 集成" },
  shadcnBase: { es: "Librería base", zh: "基础库" },
  shadcnStyle: { es: "Estilo visual", zh: "视觉样式" },
  shadcnIconLibrary: { es: "Librería de iconos", zh: "图标库" },
  shadcnColorTheme: { es: "Tema de color", zh: "颜色主题" },
  shadcnBaseColor: { es: "Color base", zh: "基础颜色" },
  shadcnFont: { es: "Fuente", zh: "字体" },
  shadcnRadius: { es: "Radio de borde", zh: "圆角" },
};

const EXACT_DESCRIPTIONS: Record<string, LocalizedMap> = {
  "End-to-end typesafe APIs": { es: "APIs type-safe de extremo a extremo", zh: "端到端类型安全 API" },
  "Typesafe APIs Made Simple": { es: "APIs type-safe de forma simple", zh: "简单的类型安全 API" },
  "Modern type-safe router for React": { es: "Router moderno y type-safe para React", zh: "现代类型安全 React 路由" },
  "Declarative routing for React": { es: "Enrutamiento declarativo para React", zh: "React 声明式路由" },
  "Client-routed React SPA powered by Vite": { es: "SPA React con routing en cliente y Vite", zh: "由 Vite 驱动的客户端 React SPA" },
  "React framework with hybrid rendering": { es: "Framework React con renderizado híbrido", zh: "支持混合渲染的 React 框架" },
  "Vue full-stack framework (SSR, SSG, hybrid)": { es: "Framework fullstack Vue (SSR, SSG, híbrido)", zh: "Vue 全栈框架（SSR、SSG、混合）" },
  "Full-stack Svelte framework for modern web apps": { es: "Framework Svelte fullstack para apps web modernas", zh: "面向现代 Web 应用的 Svelte 全栈框架" },
  "Fast JavaScript runtime & toolkit": { es: "Runtime y toolkit JavaScript rápido", zh: "高速 JavaScript 运行时和工具集" },
  "Popular Node.js framework": { es: "Framework popular para Node.js", zh: "流行的 Node.js 框架" },
  "Type-safe backend with built-in infrastructure": { es: "Backend type-safe con infraestructura integrada", zh: "内置基础设施的类型安全后端" },
  "File-based SQL database": { es: "Base de datos SQL basada en archivo", zh: "基于文件的 SQL 数据库" },
  "Advanced SQL database": { es: "Base de datos SQL avanzada", zh: "高级 SQL 数据库" },
  "Popular relational database": { es: "Base de datos relacional popular", zh: "流行的关系型数据库" },
  "NoSQL document database": { es: "Base de datos documental NoSQL", zh: "NoSQL 文档数据库" },
  "In-memory data store for caching and real-time data": {
    es: "Almacén en memoria para caché y datos en tiempo real",
    zh: "用于缓存和实时数据的内存数据存储",
  },
  "TypeScript ORM": { es: "ORM para TypeScript", zh: "TypeScript ORM" },
  "Next-gen ORM": { es: "ORM de nueva generación", zh: "下一代 ORM" },
  "Type-safe SQL query builder": { es: "Query builder SQL type-safe", zh: "类型安全 SQL 查询构建器" },
  "Industry standard payment processing": { es: "Procesamiento de pagos estándar de la industria", zh: "行业标准支付处理" },
  "Modern email API for developers": { es: "API moderna de email para desarrolladores", zh: "面向开发者的现代邮件 API" },
  "Lightweight state management with simple API": { es: "Gestión de estado ligera con API simple", zh: "轻量状态管理，API 简单" },
  "Performant, flexible form validation library": { es: "Librería de formularios rápida y flexible", zh: "高性能、灵活的表单校验库" },
};

const PRESET_DESCRIPTIONS: Record<string, LocalizedMap> = {
  "Next.js + Tailwind + shadcn/ui — no database or backend": {
    es: "Next.js + Tailwind + shadcn/ui — sin base de datos ni backend",
    zh: "Next.js + Tailwind + shadcn/ui — 无数据库或后端",
  },
  "MongoDB + Express + React Router + Node.js": {
    es: "MongoDB + Express + React Router + Node.js",
    zh: "MongoDB + Express + React Router + Node.js",
  },
  "Expo + Uniwind native app with no backend": {
    es: "App nativa Expo + Uniwind sin backend",
    zh: "Expo + Uniwind 原生应用，无后端",
  },
  "Expo with bare workflow — no backend": {
    es: "Expo con bare workflow — sin backend",
    zh: "Expo bare workflow — 无后端",
  },
};

function currentLocale(): Locale {
  const locale = getLocale();
  return locale === "es" || locale === "zh" ? locale : "en";
}

function translated(value: string, translations: Record<string, LocalizedMap>, locale = currentLocale()) {
  return translations[value]?.[locale] ?? value;
}

function patternTranslate(description: string, locale: Locale): string {
  if (locale === "en") return description;

  const skipMatch = description.match(/^Skip (.+?)( setup| integration)?$/);
  if (skipMatch) {
    const target = skipMatch[1];
    return locale === "es" ? `Omitir ${target}` : `跳过 ${target}`;
  }

  const noMatch = description.match(/^No (.+)$/);
  if (noMatch) {
    const target = noMatch[1];
    return locale === "es" ? `Sin ${target}` : `无 ${target}`;
  }

  const useMatch = description.match(/^Use (.+)$/);
  if (useMatch) {
    const target = useMatch[1];
    return locale === "es" ? `Usar ${target}` : `使用 ${target}`;
  }

  const deployToMatch = description.match(/^Deploy to (.+)$/);
  if (deployToMatch) {
    const target = deployToMatch[1];
    return locale === "es" ? `Desplegar en ${target}` : `部署到 ${target}`;
  }

  const deployWithMatch = description.match(/^Deploy with (.+)$/);
  if (deployWithMatch) {
    const target = deployWithMatch[1];
    return locale === "es" ? `Desplegar con ${target}` : `使用 ${target} 部署`;
  }

  return description;
}

export function getLocalizedCategoryDisplayName(categoryKey: string, fallback: string): string {
  const locale = currentLocale();
  return CATEGORY_NAMES[categoryKey]?.[locale] ?? fallback;
}

export function getLocalizedTechOption<T extends TechOption>(option: T): T {
  const locale = currentLocale();
  const exact = translated(option.description, EXACT_DESCRIPTIONS, locale);
  const description = exact === option.description ? patternTranslate(option.description, locale) : exact;
  return { ...option, description };
}

export function getLocalizedPresetTemplate<T extends PresetTemplate>(preset: T): T {
  const locale = currentLocale();
  return {
    ...preset,
    description: PRESET_DESCRIPTIONS[preset.description]?.[locale] ?? preset.description,
  };
}

