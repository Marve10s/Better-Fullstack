/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runherodescription2Inputs */

const en_runherodescription2 = /** @type {(inputs: Runherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness is open source. Clone it, point it at any agent — Claude Code, Codex, opencode, Kilo, or Antigravity for Gemini — and it scaffolds each spec, then scores whether the generated project actually installs and builds. Runs work with a logged-in CLI or a plain API key.`)
};

const es_runherodescription2 = /** @type {(inputs: Runherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El arnés es de código abierto. Clónalo, configúralo con cualquier agente (Claude Code, Codex, opencode, Kilo o Antigravity para Gemini) y generará la estructura de cada especificación, luego verificará si el proyecto generado se instala y compila correctamente. Se puede ejecutar con una interfaz de línea de comandos (CLI) con sesión iniciada o con una clave API simple.`)
};

const zh_runherodescription2 = /** @type {(inputs: Runherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该框架是开源的。克隆它，并将其指向任何代理——Claude Code、Codex、opencode、Kilo 或 Antigravity for Gemini——它就会为每个规范生成脚手架，然后评估生成的项目是否能够实际安装和构建。它支持使用已登录的 CLI 或纯 API 密钥运行。`)
};

const ja_runherodescription2 = /** @type {(inputs: Runherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このハーネスはオープンソースです。クローンを作成し、Claude Code、Codex、opencode、Kilo、またはGemini用のAntigravityといった任意のエージェントを指定すると、各仕様のひな形が生成され、生成されたプロジェクトが実際にインストールおよびビルドできるかどうかが評価されます。ログイン済みのCLIまたは通常のAPIキーを使用して作業を実行できます。`)
};

const ko_runherodescription2 = /** @type {(inputs: Runherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 도구는 오픈 소스입니다. 클론하고 Claude Code, Codex, opencode, Kilo 또는 Gemini용 Antigravity와 같은 에이전트를 지정하면 각 사양에 대한 스캐폴딩을 생성하고 생성된 프로젝트가 실제로 설치 및 빌드되는지 여부를 평가합니다. 로그인한 CLI 또는 일반 API 키를 사용하여 작업을 실행할 수 있습니다.`)
};

const zh_hant1_runherodescription2 = /** @type {(inputs: Runherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`該框架是開源的。複製它，並將其指向任何代理程式——Claude Code、Codex、opencode、Kilo 或 Antigravity for Gemini——它就會為每個規範生成腳手架，然後評估生成的專案是否能夠實際安裝和建置。它支援使用已登入的 CLI 或純 API 金鑰運行。`)
};

const de_runherodescription2 = /** @type {(inputs: Runherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Das Framework ist Open Source. Klonen Sie es, verweisen Sie es auf einen beliebigen Agenten – Claude Code, Codex, opencode, Kilo oder Antigravity für Gemini – und es generiert für jede Spezifikation ein Gerüst und prüft anschließend, ob das erstellte Projekt installiert und kompiliert werden kann. Die Ausführung erfolgt über eine angemeldete CLI oder einen einfachen API-Schlüssel.`)
};

const fr_runherodescription2 = /** @type {(inputs: Runherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ce framework est open source. Clonez-le, configurez-le avec n'importe quel agent (Claude Code, Codex, opencode, Kilo ou Antigravity pour Gemini) et il générera la structure de chaque spécification, puis vérifiera si le projet généré s'installe et se compile correctement. Il fonctionne avec une interface de ligne de commande (CLI) ou une simple clé API.`)
};

/**
* | output |
* | --- |
* | "The harness is open source. Clone it, point it at any agent — Claude Code, Codex, opencode, Kilo, or Antigravity for Gemini — and it scaffolds each spec, the..." |
*
* @param {Runherodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runherodescription2 = /** @type {((inputs?: Runherodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runherodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runherodescription2(inputs)
	if (locale === "es") return es_runherodescription2(inputs)
	if (locale === "zh") return zh_runherodescription2(inputs)
	if (locale === "ja") return ja_runherodescription2(inputs)
	if (locale === "ko") return ko_runherodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runherodescription2(inputs)
	if (locale === "de") return de_runherodescription2(inputs)
	return fr_runherodescription2(inputs)
});
export { runherodescription2 as "runHeroDescription" }