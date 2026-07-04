import { getLocale } from "@/paraglide/runtime.js";
import { type SupportedLocale, toSupportedLocale } from "@/lib/i18n/locales";

type Locale = SupportedLocale;
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
  api: {
    "es": "Capa API",
    "zh": "API 层",
    "ja": "API",
    "ko": "API",
    "zh-Hant": "API",
    "de": "API",
    "fr": "API",
    "uk": "API",
  },
  webFrontend: {
    "es": "Frontend web",
    "zh": "Web 前端",
    "ja": "Web フロントエンド",
    "ko": "웹 프론트엔드",
    "zh-Hant": "網頁前端",
    "de": "Web-Frontend",
    "fr": "Frontend Web",
    "uk": "Веб-інтерфейс",
  },
  nativeFrontend: {
    "es": "Frontend móvil",
    "zh": "移动前端",
    "ja": "ネイティブフロントエンド",
    "ko": "네이티브 프론트엔드",
    "zh-Hant": "原生前端",
    "de": "Natives Frontend",
    "fr": "Frontend natif",
    "uk": "Нативний інтерфейс",
  },
  runtime: {
    "es": "Runtime",
    "zh": "运行时",
    "ja": "ランタイム",
    "ko": "런타임",
    "zh-Hant": "執行環境",
    "de": "Laufzeit",
    "fr": "Runtime",
    "uk": "Runtime",
  },
  backend: {
    "es": "Backend",
    "zh": "后端",
    "ja": "バックエンド",
    "ko": "백엔드",
    "zh-Hant": "後端",
    "de": "Backend",
    "fr": "Backend",
    "uk": "Бекенд",
  },
  database: {
    "es": "Base de datos",
    "zh": "数据库",
    "ja": "データベース",
    "ko": "데이터베이스",
    "zh-Hant": "資料庫",
    "de": "Datenbank",
    "fr": "Base de données",
    "uk": "База даних",
  },
  orm: {
    "es": "ORM / base de datos",
    "zh": "ORM / 数据库",
    "ja": "ORM / データベース",
    "ko": "ORM / 데이터베이스",
    "zh-Hant": "ORM / 資料庫",
    "de": "ORM / Datenbank",
    "fr": "ORM / Base de données",
    "uk": "ORM / База даних",
  },
  auth: {
    "es": "Autenticación",
    "zh": "认证",
    "ja": "認証",
    "ko": "인증",
    "zh-Hant": "認證",
    "de": "Authentifizierung",
    "fr": "Authentification",
    "uk": "Автентифікація",
  },
  payments: {
    "es": "Pagos",
    "zh": "支付",
    "ja": "決済",
    "ko": "결제",
    "zh-Hant": "付款",
    "de": "Zahlungen",
    "fr": "Paiements",
    "uk": "Платежі",
  },
  email: {
    "es": "Email",
    "zh": "邮件",
    "ja": "電子メール",
    "ko": "이메일",
    "zh-Hant": "電子郵件",
    "de": "E-Mail",
    "fr": "E-mail",
    "uk": "Електронна пошта",
  },
  fileUpload: {
    "es": "Subida de archivos",
    "zh": "文件上传",
    "ja": "ファイルのアップロード",
    "ko": "파일 업로드",
    "zh-Hant": "檔案上傳",
    "de": "Datei-Upload",
    "fr": "Téléversement de fichiers",
    "uk": "Завантаження файлу",
  },
  logging: {
    "es": "Logs",
    "zh": "日志",
    "ja": "ロギング",
    "ko": "로깅",
    "zh-Hant": "日誌",
    "de": "Protokollierung",
    "fr": "Journalisation",
    "uk": "Логування",
  },
  observability: {
    "es": "Observabilidad",
    "zh": "可观测性",
    "ja": "可観測性",
    "ko": "관찰 가능성",
    "zh-Hant": "可觀測性",
    "de": "Observability",
    "fr": "Observabilité",
    "uk": "Спостережуваність",
  },
  rateLimit: {
    "es": "Límites de tasa",
    "zh": "速率限制",
    "ja": "レート制限",
    "ko": "속도 제한",
    "zh-Hant": "速率限制",
    "de": "Ratenbegrenzung",
    "fr": "Limitation de débit",
    "uk": "Обмеження швидкості",
  },
  featureFlags: {
    "es": "Feature flags",
    "zh": "功能开关",
    "ja": "機能フラグ",
    "ko": "기능 플래그",
    "zh-Hant": "功能旗標",
    "de": "Feature-Flags",
    "fr": "Indicateurs de fonctionnalités",
    "uk": "Feature flags",
  },
  analytics: {
    "es": "Analítica",
    "zh": "分析",
    "ja": "分析",
    "ko": "분석",
    "zh-Hant": "分析",
    "de": "Analytics",
    "fr": "Analytique",
    "uk": "Аналітика",
  },
  backendLibraries: {
    "es": "Servicios Effect",
    "zh": "Effect 服务",
    "ja": "Effect サービス",
    "ko": "Effect 서비스",
    "zh-Hant": "Effect 服務",
    "de": "Effect-Dienste",
    "fr": "Services Effect",
    "uk": "Сервіси Effect",
  },
  stateManagement: {
    "es": "Estado",
    "zh": "状态管理",
    "ja": "状態管理",
    "ko": "상태 관리",
    "zh-Hant": "狀態管理",
    "de": "State Management",
    "fr": "Gestion d'état",
    "uk": "Керування станом",
  },
  forms: {
    "es": "Formularios",
    "zh": "表单",
    "ja": "フォーム",
    "ko": "양식",
    "zh-Hant": "表單",
    "de": "Formulare",
    "fr": "Formulaires",
    "uk": "Форми",
  },
  validation: {
    "es": "Validación",
    "zh": "校验",
    "ja": "検証",
    "ko": "검증",
    "zh-Hant": "驗證",
    "de": "Validierung",
    "fr": "Validation",
    "uk": "Перевірка",
  },
  testing: {
    "es": "Pruebas",
    "zh": "测试",
    "ja": "テスト",
    "ko": "테스트",
    "zh-Hant": "測試",
    "de": "Testen",
    "fr": "Tests",
    "uk": "Тестування",
  },
  animation: {
    "es": "Animación",
    "zh": "动画",
    "ja": "アニメーション",
    "ko": "애니메이션",
    "zh-Hant": "動畫",
    "de": "Animation",
    "fr": "Animation",
    "uk": "Анімація",
  },
  cssFramework: {
    "es": "Framework CSS",
    "zh": "CSS 框架",
    "ja": "CSSフレームワーク",
    "ko": "CSS 프레임워크",
    "zh-Hant": "CSS 框架",
    "de": "CSS-Framework",
    "fr": "Framework CSS",
    "uk": "CSS-фреймворк",
  },
  uiLibrary: {
    "es": "Librería UI",
    "zh": "UI 库",
    "ja": "UI ライブラリ",
    "ko": "UI 라이브러리",
    "zh-Hant": "使用者介面庫",
    "de": "UI-Bibliothek",
    "fr": "Bibliothèque d'interface utilisateur",
    "uk": "UI-бібліотека",
  },
  appPlatforms: {
    "es": "Plataformas de app",
    "zh": "应用平台",
    "ja": "アプリプラットフォーム",
    "ko": "앱 플랫폼",
    "zh-Hant": "應用程式平台",
    "de": "App-Plattformen",
    "fr": "Plateformes d'applications",
    "uk": "Платформи додатків",
  },
  packageManager: {
    "es": "Gestor de paquetes",
    "zh": "包管理器",
    "ja": "パッケージマネージャー",
    "ko": "패키지 관리자",
    "zh-Hant": "套件管理器",
    "de": "Paketmanager",
    "fr": "Gestionnaire de paquets",
    "uk": "Менеджер пакетів",
  },
  versionChannel: {
    "es": "Canal de versión",
    "zh": "版本通道",
    "ja": "バージョンチャンネル",
    "ko": "버전 채널",
    "zh-Hant": "版本頻道",
    "de": "Versionskanal",
    "fr": "Canal de version",
    "uk": "Канал версії",
  },
  git: {
    "es": "Git",
    "zh": "Git",
    "ja": "Git",
    "ko": "Git",
    "zh-Hant": "Git",
    "de": "Git",
    "fr": "Git",
    "uk": "Git",
  },
  install: {
    "es": "Instalación",
    "zh": "安装",
    "ja": "インストール",
    "ko": "설치",
    "zh-Hant": "安裝",
    "de": "Installieren",
    "fr": "Installer",
    "uk": "Встановлення",
  },
  i18n: {
    "es": "Internacionalización (i18n)",
    "zh": "国际化 (i18n)",
    "ja": "国際化 (i18n)",
    "ko": "국제화(i18n)",
    "zh-Hant": "國際化 (i18n)",
    "de": "Internationalisierung (i18n)",
    "fr": "Internationalisation (i18n)",
    "uk": "Інтернаціоналізація (i18n)",
  },
  cms: {
    "es": "CMS",
    "zh": "CMS",
    "ja": "CMS",
    "ko": "CMS",
    "zh-Hant": "CMS",
    "de": "CMS",
    "fr": "CMS",
    "uk": "CMS",
  },
  search: {
    "es": "Búsqueda",
    "zh": "搜索",
    "ja": "検索",
    "ko": "검색",
    "zh-Hant": "搜尋",
    "de": "Suche",
    "fr": "Recherche",
    "uk": "Пошук",
  },
  fileStorage: {
    "es": "Almacenamiento de archivos",
    "zh": "文件存储",
    "ja": "ファイルストレージ",
    "ko": "파일 스토리지",
    "zh-Hant": "檔案儲存",
    "de": "Dateispeicherung",
    "fr": "Stockage de fichiers",
    "uk": "Зберігання файлів",
  },
  mobileNavigation: {
    "es": "Navegación móvil",
    "zh": "移动导航",
    "ja": "モバイルナビゲーション",
    "ko": "모바일 내비게이션",
    "zh-Hant": "行動導航",
    "de": "Mobile Navigation",
    "fr": "Navigation mobile",
    "uk": "Мобільна навігація",
  },
  mobileUI: {
    "es": "UI móvil",
    "zh": "移动 UI",
    "ja": "モバイル UI",
    "ko": "모바일 UI",
    "zh-Hant": "行動 UI",
    "de": "Mobile UI",
    "fr": "UI mobile",
    "uk": "Мобільний UI",
  },
  mobileStorage: {
    "es": "Almacenamiento móvil",
    "zh": "移动存储",
    "ja": "モバイルストレージ",
    "ko": "모바일 스토리지",
    "zh-Hant": "行動儲存",
    "de": "Mobiler Speicher",
    "fr": "Stockage mobile",
    "uk": "Мобільне сховище",
  },
  mobileTesting: {
    "es": "Pruebas móviles",
    "zh": "移动测试",
    "ja": "モバイルテスト",
    "ko": "모바일 테스트",
    "zh-Hant": "行動測試",
    "de": "Mobiles Testen",
    "fr": "Tests mobiles",
    "uk": "Мобільне тестування",
  },
  mobilePush: {
    "es": "Push móvil",
    "zh": "移动推送",
    "ja": "モバイルプッシュ",
    "ko": "모바일 푸시",
    "zh-Hant": "行動推播",
    "de": "Mobiler Push",
    "fr": "Push mobile",
    "uk": "Мобільний Push",
  },
  mobileOTA: {
    "es": "Actualizaciones OTA",
    "zh": "OTA 更新",
    "ja": "モバイル OTA",
    "ko": "모바일 OTA",
    "zh-Hant": "行動 OTA",
    "de": "Mobile OTA",
    "fr": "OTA mobile",
    "uk": "Мобільний OTA",
  },
  mobileDeepLinking: {
    "es": "Deep linking móvil",
    "zh": "移动深链",
    "ja": "モバイルディープリンク",
    "ko": "모바일 딥링킹",
    "zh-Hant": "行動深層連結",
    "de": "Mobiles Deep Linking",
    "fr": "Liens profonds mobiles",
    "uk": "Мобільний Deep Linking",
  },
  rustWebFramework: {
    "es": "Framework web Rust",
    "zh": "Rust Web 框架",
    "ja": "Rust Web フレームワーク",
    "ko": "Rust 웹 프레임워크",
    "zh-Hant": "Rust Web 框架",
    "de": "Rust Web Framework",
    "fr": "Framework Web Rust",
    "uk": "Rust Веб-фреймворк",
  },
  rustFrontend: {
    "es": "Frontend Rust (WASM)",
    "zh": "Rust 前端 (WASM)",
    "ja": "Rust フロントエンド (WASM)",
    "ko": "Rust 프론트엔드(WASM)",
    "zh-Hant": "Rust 前端 (WASM)",
    "de": "Rust Frontend (WASM)",
    "fr": "Frontend Rust (WASM)",
    "uk": "Rust Інтерфейс (WASM)",
  },
  rustOrm: {
    "es": "ORM / base de datos Rust",
    "zh": "Rust ORM / 数据库",
    "ja": "Rust ORM / データベース",
    "ko": "Rust ORM / 데이터베이스",
    "zh-Hant": "Rust ORM / 資料庫",
    "de": "Rust ORM / Datenbank",
    "fr": "Rust ORM / Base de données",
    "uk": "Rust ORM / База даних",
  },
  rustApi: {
    "es": "Capa API Rust",
    "zh": "Rust API 层",
    "ja": "Rust API 層",
    "ko": "Rust API 레이어",
    "zh-Hant": "Rust API 層",
    "de": "Rust API Ebene",
    "fr": "Couche API Rust",
    "uk": "Rust API Шар",
  },
  rustCli: {
    "es": "Herramientas CLI Rust",
    "zh": "Rust CLI 工具",
    "ja": "Rust CLI ツール",
    "ko": "Rust CLI 도구",
    "zh-Hant": "Rust CLI 工具",
    "de": "Rust CLI Werkzeuge",
    "fr": "Outils CLI Rust",
    "uk": "Rust CLI Інструменти",
  },
  pythonWebFramework: {
    "es": "Framework web Python",
    "zh": "Python Web 框架",
    "ja": "Python Web フレームワーク",
    "ko": "Python 웹 프레임워크",
    "zh-Hant": "Python Web 框架",
    "de": "Python Web Framework",
    "fr": "Framework Web Python",
    "uk": "Python Веб-фреймворк",
  },
  pythonOrm: {
    "es": "ORM / base de datos Python",
    "zh": "Python ORM / 数据库",
    "ja": "Python ORM / データベース",
    "ko": "Python ORM / 데이터베이스",
    "zh-Hant": "Python ORM / 資料庫",
    "de": "Python ORM / Datenbank",
    "fr": "Python ORM / Base de données",
    "uk": "Python ORM / База даних",
  },
  pythonAi: {
    "es": "IA / ML Python",
    "zh": "Python AI / ML",
    "ja": "Python AI / ML",
    "ko": "Python AI / ML",
    "zh-Hant": "Python AI / ML",
    "de": "Python AI / ML",
    "fr": "Python AI / ML",
    "uk": "Python AI / ML",
  },
  pythonApi: {
    "es": "Framework API Python",
    "zh": "Python API 框架",
    "ja": "Python API フレームワーク",
    "ko": "Python API 프레임워크",
    "zh-Hant": "Python API 框架",
    "de": "Python API Framework",
    "fr": "Framework API Python",
    "uk": "Python API Фреймворк",
  },
  pythonTaskQueue: {
    "es": "Cola de tareas Python",
    "zh": "Python 任务队列",
    "ja": "Python タスクキュー",
    "ko": "Python 작업 대기열",
    "zh-Hant": "Python 工作佇列",
    "de": "Python Aufgabenwarteschlange",
    "fr": "File d'attente des tâches Python",
    "uk": "Python Черга завдань",
  },
  goWebFramework: {
    "es": "Framework web Go",
    "zh": "Go Web 框架",
    "ja": "Go Web フレームワーク",
    "ko": "Go 웹 프레임워크",
    "zh-Hant": "Go Web 框架",
    "de": "Go Web Framework",
    "fr": "Framework Web Go",
    "uk": "Go Веб-фреймворк",
  },
  goOrm: {
    "es": "ORM / base de datos Go",
    "zh": "Go ORM / 数据库",
    "ja": "Go ORM / データベース",
    "ko": "Go ORM / 데이터베이스",
    "zh-Hant": "Go ORM / 資料庫",
    "de": "Go ORM / Datenbank",
    "fr": "Go ORM / Base de données",
    "uk": "Go ORM / База даних",
  },
  goApi: {
    "es": "Capa API Go",
    "zh": "Go API 层",
    "ja": "Go API 層",
    "ko": "Go API 레이어",
    "zh-Hant": "Go API 層",
    "de": "Go API Ebene",
    "fr": "Couche API Go",
    "uk": "Go API Шар",
  },
  goCli: {
    "es": "Herramientas CLI Go",
    "zh": "Go CLI 工具",
    "ja": "Go CLI ツール",
    "ko": "Go CLI 도구",
    "zh-Hant": "Go CLI 工具",
    "de": "Go CLI Werkzeuge",
    "fr": "Outils CLI Go",
    "uk": "Go CLI Інструменти",
  },
  javaWebFramework: {
    "es": "Framework web Java",
    "zh": "Java Web 框架",
    "ja": "Java Web フレームワーク",
    "ko": "Java 웹 프레임워크",
    "zh-Hant": "Java Web 框架",
    "de": "Java Web Framework",
    "fr": "Framework Web Java",
    "uk": "Java Веб-фреймворк",
  },
  javaBuildTool: {
    "es": "Herramienta de build Java",
    "zh": "Java 构建工具",
    "ja": "Java ビルドツール",
    "ko": "Java 빌드 도구",
    "zh-Hant": "Java 建置工具",
    "de": "Java Build-Tool",
    "fr": "Outil de build Java",
    "uk": "Java Інструмент збірки",
  },
  javaOrm: {
    "es": "ORM / base de datos Java",
    "zh": "Java ORM / 数据库",
    "ja": "Java ORM / データベース",
    "ko": "Java ORM / 데이터베이스",
    "zh-Hant": "Java ORM / 資料庫",
    "de": "Java ORM / Datenbank",
    "fr": "Java ORM / Base de données",
    "uk": "Java ORM / База даних",
  },
  javaAuth: {
    "es": "Auth Java",
    "zh": "Java 认证",
    "ja": "Java 認証",
    "ko": "Java 인증",
    "zh-Hant": "Java 認證",
    "de": "Java Authentifizierung",
    "fr": "Authentification Java",
    "uk": "Java Автентифікація",
  },
  elixirWebFramework: {
    "es": "Framework web Elixir",
    "zh": "Elixir Web 框架",
    "ja": "Elixir Web フレームワーク",
    "ko": "Elixir 웹 프레임워크",
    "zh-Hant": "Elixir Web 框架",
    "de": "Elixir Web Framework",
    "fr": "Framework Web Elixir",
    "uk": "Elixir Веб-фреймворк",
  },
  elixirOrm: {
    "es": "ORM / base de datos Elixir",
    "zh": "Elixir ORM / 数据库",
    "ja": "Elixir ORM / データベース",
    "ko": "Elixir ORM / 데이터베이스",
    "zh-Hant": "Elixir ORM / 資料庫",
    "de": "Elixir ORM / Datenbank",
    "fr": "Elixir ORM / Base de données",
    "uk": "Elixir ORM / База даних",
  },
  elixirAuth: {
    "es": "Auth Elixir",
    "zh": "Elixir 认证",
    "ja": "Elixir 認証",
    "ko": "Elixir 인증",
    "zh-Hant": "Elixir 認證",
    "de": "Elixir Authentifizierung",
    "fr": "Authentification Elixir",
    "uk": "Elixir Автентифікація",
  },
  dotnetWebFramework: {
    "es": "Framework web .NET",
    "zh": ".NET Web 框架",
    "ja": ".NET Web フレームワーク",
    "ko": ".NET 웹 프레임워크",
    "zh-Hant": ".NET Web 框架",
    "de": ".NET Web Framework",
    "fr": "Framework Web .NET",
    "uk": ".NET Веб-фреймворк",
  },
  dotnetOrm: {
    "es": "ORM / base de datos .NET",
    "zh": ".NET 数据访问",
    "ja": ".NET データ アクセス",
    "ko": ".NET 데이터 액세스",
    "zh-Hant": ".NET 資料存取",
    "de": ".NET Datenzugriff",
    "fr": ".NET Accès aux données",
    "uk": ".NET Доступ до даних",
  },
  dotnetApi: {
    "es": "Capa API .NET",
    "zh": ".NET API 风格",
    "ja": ".NET API スタイル",
    "ko": ".NET API 스타일",
    "zh-Hant": ".NET API 風格",
    "de": ".NET API Stil",
    "fr": ".NET API Style",
    "uk": ".NET API Стиль",
  },
  dotnetAuth: {
    "es": "Auth .NET",
    "zh": ".NET 认证",
    "ja": ".NET 認証",
    "ko": ".NET 인증",
    "zh-Hant": ".NET 認證",
    "de": ".NET Authentifizierung",
    "fr": "Authentification .NET",
    "uk": ".NET Автентифікація",
  },
  astroIntegration: {
    "es": "Integración de Astro",
    "zh": "Astro 集成",
    "ja": "Astro インテグレーション",
    "ko": "Astro 통합",
    "zh-Hant": "Astro 整合",
    "de": "Astro-Integration",
    "fr": "Intégration Astro",
    "uk": "Astro Інтеграція",
  },
  shadcnBase: {
    "es": "Librería base",
    "zh": "基础库",
    "ja": "shadcn ベース",
    "ko": "shadcn 베이스",
    "zh-Hant": "shadcn 基礎",
    "de": "shadcn Basis",
    "fr": "Base shadcn",
    "uk": "База shadcn",
  },
  shadcnStyle: {
    "es": "Estilo visual",
    "zh": "视觉样式",
    "ja": "shadcn スタイル",
    "ko": "Shadcn 스타일",
    "zh-Hant": "Shadcn 風格",
    "de": "shadcn-Stil",
    "fr": "Style Shadcn",
    "uk": "Стиль Shadcn",
  },
  shadcnIconLibrary: {
    "es": "Librería de iconos",
    "zh": "图标库",
    "ja": "shadcn アイコンライブラリ",
    "ko": "Shadcn 아이콘 라이브러리",
    "zh-Hant": "Shadcn 圖示庫",
    "de": "shadcn-Symbolbibliothek",
    "fr": "Bibliothèque d'icônes Shadcn",
    "uk": "Бібліотека значків Shadcn",
  },
  shadcnColorTheme: {
    "es": "Tema de color",
    "zh": "颜色主题",
    "ja": "shadcn カラーテーマ",
    "ko": "Shadcn 컬러 테마",
    "zh-Hant": "Shadcn 顏色主題",
    "de": "shadcn-Farbthema",
    "fr": "Thème de couleur Shadcn",
    "uk": "Кольорова тема Shadcn",
  },
  shadcnBaseColor: {
    "es": "Color base",
    "zh": "基础颜色",
    "ja": "shadcn ベースカラー",
    "ko": "Shadcn 기본 색상",
    "zh-Hant": "Shadcn 基色",
    "de": "shadcn Grundfarbe",
    "fr": "Couleur de base Shadcn",
    "uk": "Базовий колір Shadcn",
  },
  shadcnFont: {
    "es": "Fuente",
    "zh": "字体",
    "ja": "shadcn フォント",
    "ko": "Shadcn 글꼴",
    "zh-Hant": "shadcn 字體",
    "de": "shadcn-Schriftart",
    "fr": "Police Shadcn",
    "uk": "Шрифт Shadcn",
  },
  shadcnRadius: {
    "es": "Radio de borde",
    "zh": "圆角",
    "ja": "shadcn 半径",
    "ko": "Shadcn 반경",
    "zh-Hant": "shadcn 圓角",
    "de": "shadcn Radius",
    "fr": "Rayon shadcn",
    "uk": "Радіус Shadcn",
  },
};

const EXACT_DESCRIPTIONS: Record<string, LocalizedMap> = {
  "End-to-end typesafe APIs": {
    "es": "APIs type-safe de extremo a extremo",
    "zh": "端到端类型安全 API",
    "ja": "エンドツーエンドのタイプセーフな API",
    "ko": "종단 간 유형 안전 APIs",
    "zh-Hant": "端對端類型安全 APIs",
    "de": "Durchgängig typsichere APIs",
    "fr": "APIs type-safe de bout en bout",
    "uk": "Наскрізно типобезпечні API",
  },
  "Typesafe APIs Made Simple": {
    "es": "APIs type-safe de forma simple",
    "zh": "简单的类型安全 API",
    "ja": "タイプセーフ API をシンプルに",
    "ko": "유형 안전 API를 간단하게",
    "zh-Hant": "類型安全 APIs 變得簡單",
    "de": "Typsichere APIs leicht gemacht",
    "fr": "Les APIs type-safe en toute simplicité",
    "uk": "Типобезпечні API — це просто",
  },
  "Modern type-safe router for React": {
    "es": "Router moderno y type-safe para React",
    "zh": "现代类型安全 React 路由",
    "ja": "React 用の最新のタイプセーフ ルーター",
    "ko": "React용 최신 유형 안전 라우터",
    "zh-Hant": "React 的現代型別安全路由器",
    "de": "Moderner typsicherer Router für React",
    "fr": "Routeur moderne et type-safe pour React",
    "uk": "Сучасний типобезпечний маршрутизатор для React",
  },
  "Declarative routing for React": {
    "es": "Enrutamiento declarativo para React",
    "zh": "React 声明式路由",
    "ja": "React の宣言型ルーティング",
    "ko": "React용 선언적 라우팅",
    "zh-Hant": "React 的宣告式路由",
    "de": "Deklaratives Routing für React",
    "fr": "Routage déclaratif pour React",
    "uk": "Декларативна маршрутизація для React",
  },
  "Client-routed React SPA powered by Vite": {
    "es": "SPA React con enrutamiento en el cliente y tecnología de Vite",
    "zh": "由 Vite 驱动的客户端 React SPA",
    "ja": "Vite を利用したクライアント ルーティングの React SPA",
    "ko": "Vite에서 제공하는 클라이언트 라우팅 React SPA",
    "zh-Hant": "由 Vite 提供支援的客戶端路由 React SPA",
    "de": "Client-seitig geroutetes React SPA auf Basis von Vite",
    "fr": "SPA React à routage côté client, propulsé par Vite",
    "uk": "Клієнтська маршрутизація React SPA на базі Vite",
  },
  "React framework with hybrid rendering": {
    "es": "Framework React con renderizado híbrido",
    "zh": "支持混合渲染的 React 框架",
    "ja": "ハイブリッド レンダリングを備えた React フレームワーク",
    "ko": "하이브리드 렌더링을 사용하는 React 프레임워크",
    "zh-Hant": "具有混合渲染的 React 框架",
    "de": "React-Framework mit Hybrid-Rendering",
    "fr": "Framework React avec rendu hybride",
    "uk": "React фреймворк із гібридним рендерингом",
  },
  "Vue full-stack framework (SSR, SSG, hybrid)": {
    "es": "Framework fullstack Vue (SSR, SSG, híbrido)",
    "zh": "Vue 全栈框架（SSR、SSG、混合）",
    "ja": "Vue フルスタック フレームワーク (SSR、SSG、ハイブリッド)",
    "ko": "Vue 풀 스택 프레임워크(SSR, SSG, 하이브리드)",
    "zh-Hant": "Vue 全端框架（SSR、SSG、混合）",
    "de": "Vue Full-Stack-Framework (SSR, SSG, Hybrid)",
    "fr": "Framework full-stack Vue (SSR, SSG, hybride)",
    "uk": "Vue фреймворк із повним стеком (SSR, SSG, гібридний)",
  },
  "Full-stack Svelte framework for modern web apps": {
    "es": "Framework Svelte fullstack para apps web modernas",
    "zh": "面向现代 Web 应用的 Svelte 全栈框架",
    "ja": "最新の Web アプリ用のフルスタック Svelte フレームワーク",
    "ko": "최신 웹 앱을 위한 풀 스택 Svelte 프레임워크",
    "zh-Hant": "適用於現代 Web 應用程式的全端 Svelte 框架",
    "de": "Full-Stack Svelte-Framework für moderne Web-Apps",
    "fr": "Framework Svelte full-stack pour les applications Web modernes",
    "uk": "Svelte фреймворк із повним стеком для сучасних веб-програм",
  },
  "Fast JavaScript runtime & toolkit": {
    "es": "Runtime y toolkit rápidos de JavaScript",
    "zh": "高速 JavaScript 运行时和工具集",
    "ja": "高速 JavaScript ランタイムとツールキット",
    "ko": "빠른 JavaScript 런타임 및 툴킷",
    "zh-Hant": "快速 JavaScript 執行環境和工具包",
    "de": "Schnelle JavaScript-Laufzeit und Toolkit",
    "fr": "Runtime et boîte à outils JavaScript rapides",
    "uk": "Швидке середовище виконання JavaScript та інструментарій",
  },
  "Popular Node.js framework": {
    "es": "Framework popular para Node.js",
    "zh": "流行的 Node.js 框架",
    "ja": "人気の Node.js フレームワーク",
    "ko": "인기 있는 Node.js 프레임워크",
    "zh-Hant": "流行的 Node.js 框架",
    "de": "Beliebtes Node.js-Framework",
    "fr": "Framework Node.js populaire",
    "uk": "Популярний фреймворк Node.js",
  },
  "Type-safe backend with built-in infrastructure": {
    "es": "Backend type-safe con infraestructura integrada",
    "zh": "内置基础设施的类型安全后端",
    "ja": "インフラストラクチャが組み込まれたタイプセーフなバックエンド",
    "ko": "기본 제공 인프라를 갖춘 유형이 안전한 백엔드",
    "zh-Hant": "具有內建基礎設施的類型安全後端",
    "de": "Typsicheres Backend mit integrierter Infrastruktur",
    "fr": "Backend type-safe avec infrastructure intégrée",
    "uk": "Типобезпечний бекенд із вбудованою інфраструктурою",
  },
  "File-based SQL database": {
    "es": "Base de datos SQL basada en archivo",
    "zh": "基于文件的 SQL 数据库",
    "ja": "ファイルベースの SQL データベース",
    "ko": "파일 기반 SQL 데이터베이스",
    "zh-Hant": "基於檔案的 SQL 資料庫",
    "de": "Dateibasierte SQL-Datenbank",
    "fr": "Base de données SQL basée sur des fichiers",
    "uk": "Файлова база даних SQL",
  },
  "Advanced SQL database": {
    "es": "Base de datos SQL avanzada",
    "zh": "高级 SQL 数据库",
    "ja": "高度な SQL データベース",
    "ko": "고급 SQL 데이터베이스",
    "zh-Hant": "進階 SQL 資料庫",
    "de": "Erweiterte SQL-Datenbank",
    "fr": "Base de données SQL avancée",
    "uk": "Розширена база даних SQL",
  },
  "Popular relational database": {
    "es": "Base de datos relacional popular",
    "zh": "流行的关系型数据库",
    "ja": "人気のリレーショナル データベース",
    "ko": "인기 있는 관계형 데이터베이스",
    "zh-Hant": "流行的關聯式資料庫",
    "de": "Beliebte relationale Datenbank",
    "fr": "Base de données relationnelle populaire",
    "uk": "Популярна реляційна база даних",
  },
  "NoSQL document database": {
    "es": "Base de datos documental NoSQL",
    "zh": "NoSQL 文档数据库",
    "ja": "NoSQL ドキュメント データベース",
    "ko": "NoSQL 문서 데이터베이스",
    "zh-Hant": "NoSQL 文件資料庫",
    "de": "NoSQL Dokumentendatenbank",
    "fr": "Base de données documentaire NoSQL",
    "uk": "База даних документів NoSQL",
  },
  "In-memory data store for caching and real-time data": {
    "es": "Almacén en memoria para caché y datos en tiempo real",
    "zh": "用于缓存和实时数据的内存数据存储",
    "ja": "キャッシュおよびリアルタイム データ用のインメモリ データ ストア",
    "ko": "캐싱 및 실시간 데이터를 위한 인메모리 데이터 저장소",
    "zh-Hant": "用於快取和即時資料的記憶體資料儲存區",
    "de": "In-Memory-Datenspeicher für Caching und Echtzeitdaten",
    "fr": "Magasin de données en mémoire pour la mise en cache et les données en temps réel",
    "uk": "Сховище даних у пам’яті для кешування та даних у реальному часі",
  },
  "TypeScript ORM": {
    "es": "ORM para TypeScript",
    "zh": "TypeScript ORM",
    "ja": "TypeScript ORM",
    "ko": "TypeScript ORM",
    "zh-Hant": "TypeScript ORM",
    "de": "TypeScript ORM",
    "fr": "TypeScript ORM",
    "uk": "TypeScript ORM",
  },
  "Next-gen ORM": {
    "es": "ORM de nueva generación",
    "zh": "下一代 ORM",
    "ja": "次世代 ORM",
    "ko": "차세대 ORM",
    "zh-Hant": "下一代 ORM",
    "de": "ORM der nächsten Generation",
    "fr": "ORM nouvelle génération",
    "uk": "ORM наступного покоління",
  },
  "Type-safe SQL query builder": {
    "es": "Query builder SQL type-safe",
    "zh": "类型安全 SQL 查询构建器",
    "ja": "タイプセーフな SQL クエリ ビルダー",
    "ko": "유형이 안전한 SQL 쿼리 빌더",
    "zh-Hant": "類型安全 SQL 查詢產生器",
    "de": "Typsicherer SQL-Abfrage-Generator",
    "fr": "Générateur de requêtes SQL type-safe",
    "uk": "Типобезпечний конструктор запитів SQL",
  },
  "Industry standard payment processing": {
    "es": "Procesamiento de pagos estándar de la industria",
    "zh": "行业标准支付处理",
    "ja": "業界標準の決済処理",
    "ko": "업계 표준 결제 처리",
    "zh-Hant": "業界標準支付處理",
    "de": "Zahlungsabwicklung nach Branchenstandard",
    "fr": "Traitement des paiements conforme aux normes de l'industrie",
    "uk": "Обробка платежів за галузевим стандартом",
  },
  "Modern email API for developers": {
    "es": "API moderna de email para desarrolladores",
    "zh": "面向开发者的现代邮件 API",
    "ja": "開発者向けの最新の電子メール API",
    "ko": "개발자를 위한 최신 이메일 API",
    "zh-Hant": "開發人員的現代電子郵件 API",
    "de": "Moderne E-Mail-API für Entwickler",
    "fr": "API e-mail moderne pour les développeurs",
    "uk": "Сучасний API електронної пошти для розробників",
  },
  "Lightweight state management with simple API": {
    "es": "Gestión de estado ligera con API simple",
    "zh": "轻量状态管理，API 简单",
    "ja": "シンプルな API による軽量の状態管理",
    "ko": "간단한 API를 사용한 경량 상태 관리",
    "zh-Hant": "使用簡單的 API 進行輕量級狀態管理",
    "de": "Leichtes Zustandsmanagement mit einfacher API",
    "fr": "Gestion d'état légère avec API simple",
    "uk": "Легке керування станом із простим API",
  },
  "Performant, flexible form validation library": {
    "es": "Librería de validación de formularios rápida y flexible",
    "zh": "高性能、灵活的表单校验库",
    "ja": "パフォーマンスが高く柔軟なフォーム検証ライブラリ",
    "ko": "성능이 뛰어나고 유연한 양식 검증 라이브러리",
    "zh-Hant": "高效能、靈活的表單驗證庫",
    "de": "Leistungsstarke, flexible Formularvalidierungsbibliothek",
    "fr": "Bibliothèque de validation de formulaires performante et flexible",
    "uk": "Ефективна, гнучка бібліотека перевірки форм",
  },
};

const PRESET_DESCRIPTIONS: Record<string, LocalizedMap> = {
  "Next.js + Tailwind + shadcn/ui — no database or backend": {
    "es": "Next.js + Tailwind + shadcn/ui — sin base de datos ni backend",
    "zh": "Next.js + Tailwind + shadcn/ui — 无数据库或后端",
    "ja": "Next.js + Tailwind + shadcn/ui — データベースまたはバックエンドなし",
    "ko": "Next.js + Tailwind + shadcn/ui — 데이터베이스 또는 백엔드 없음",
    "zh-Hant": "Next.js + Tailwind + shadcn/ui — 無資料庫或後端",
    "de": "Next.js + Tailwind + shadcn/ui – ohne Datenbank oder Backend",
    "fr": "Next.js + Tailwind + shadcn/ui — pas de base de données ni de backend",
    "uk": "Next.js + Tailwind + shadcn/ui — без бази даних або бекенда",
  },
  "MongoDB + Express + React Router + Node.js": {
    "es": "MongoDB + Express + React Router + Node.js",
    "zh": "MongoDB + Express + React Router + Node.js",
    "ja": "MongoDB + Express + React Router + Node.js",
    "ko": "MongoDB + Express + React Router + Node.js",
    "zh-Hant": "MongoDB + Express + React Router + Node.js",
    "de": "MongoDB + Express + React Router + Node.js",
    "fr": "MongoDB + Express + React Router + Node.js",
    "uk": "MongoDB + Express + React Router + Node.js",
  },
  "Expo + Uniwind native app with no backend": {
    "es": "App nativa Expo + Uniwind sin backend",
    "zh": "Expo + Uniwind 原生应用，无后端",
    "ja": "バックエンドのない Expo + Uniwind ネイティブ アプリ",
    "ko": "백엔드가 없는 Expo + Uniwind 네이티브 앱",
    "zh-Hant": "Expo + Uniwind 無後端的原生應用程式",
    "de": "Expo + Uniwind native App ohne Backend",
    "fr": "Application native Expo + Uniwind sans backend",
    "uk": "Expo + Uniwind нативний додаток без бекенда",
  },
  "Expo with bare workflow — no backend": {
    "es": "Expo con bare workflow — sin backend",
    "zh": "Expo bare workflow — 无后端",
    "ja": "Expo (bare workflow) — バックエンドなし",
    "ko": "베어 워크플로를 사용하는 Expo — 백엔드 없음",
    "zh-Hant": "Expo 搭配 bare workflow — 無後端",
    "de": "Expo mit Bare Workflow – kein Backend",
    "fr": "Expo avec bare workflow – pas de backend",
    "uk": "Expo з bare workflow — без бекенда",
  },
};

function currentLocale(): Locale {
  return toSupportedLocale(getLocale()) ?? "en";
}

function translated(value: string, translations: Record<string, LocalizedMap>, locale = currentLocale()) {
  return translations[value]?.[locale] ?? value;
}

function isChineseLocale(locale: Locale): locale is "zh" | "zh-Hant" {
  return locale === "zh" || locale === "zh-Hant";
}

function patternTranslate(description: string, locale: Locale): string {
  if (locale === "en") return description;

  const skipMatch = description.match(/^Skip (.+?)( setup| integration)?$/);
  if (skipMatch) {
    const target = skipMatch[1];
    if (locale === "es") return `Omitir ${target}`;
    if (isChineseLocale(locale)) return `跳过 ${target}`;
    if (locale === "ja") return `${target} をスキップ`;
    if (locale === "ko") return `${target} 건너뛰기`;
    if (locale === "de") return `${target} überspringen`;
    if (locale === "fr") return `Ignorer ${target}`;
    if (locale === "uk") return `Пропустити ${target}`;
    return description;
  }

  const noMatch = description.match(/^No (.+)$/);
  if (noMatch) {
    const target = noMatch[1];
    if (locale === "es") return `Sin ${target}`;
    if (isChineseLocale(locale)) return `无 ${target}`;
    if (locale === "ja") return `${target} なし`;
    if (locale === "ko") return `${target} 없음`;
    if (locale === "de") return `Kein ${target}`;
    if (locale === "fr") return `Sans ${target}`;
    if (locale === "uk") return `Без ${target}`;
    return description;
  }

  const useMatch = description.match(/^Use (.+)$/);
  if (useMatch) {
    const target = useMatch[1];
    if (locale === "es") return `Usar ${target}`;
    if (isChineseLocale(locale)) return `使用 ${target}`;
    if (locale === "ja") return `${target} を使用`;
    if (locale === "ko") return `${target} 사용`;
    if (locale === "de") return `${target} verwenden`;
    if (locale === "fr") return `Utiliser ${target}`;
    if (locale === "uk") return `Використати ${target}`;
    return description;
  }

  const deployToMatch = description.match(/^Deploy to (.+)$/);
  if (deployToMatch) {
    const target = deployToMatch[1];
    if (locale === "es") return `Desplegar en ${target}`;
    if (isChineseLocale(locale)) return `部署到 ${target}`;
    if (locale === "ja") return `${target} にデプロイ`;
    if (locale === "ko") return `${target}에 배포`;
    if (locale === "de") return `Auf ${target} bereitstellen`;
    if (locale === "fr") return `Déployer sur ${target}`;
    if (locale === "uk") return `Розгорнути на ${target}`;
    return description;
  }

  const deployWithMatch = description.match(/^Deploy with (.+)$/);
  if (deployWithMatch) {
    const target = deployWithMatch[1];
    if (locale === "es") return `Desplegar con ${target}`;
    if (isChineseLocale(locale)) return `使用 ${target} 部署`;
    if (locale === "ja") return `${target} でデプロイ`;
    if (locale === "ko") return `${target}로 배포`;
    if (locale === "de") return `Mit ${target} bereitstellen`;
    if (locale === "fr") return `Déployer avec ${target}`;
    if (locale === "uk") return `Розгорнути за допомогою ${target}`;
    return description;
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
