/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612summary2Inputs */

const en_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This release benchmarks how AI agents scaffold with Better Fullstack and publishes the results on the homepage, adds .NET as a first-class ecosystem on the new stack graph, and ships a much leaner install. It also fixes four scaffold bugs the benchmark itself uncovered.`)
};

const es_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Esta versión mide cómo los agentes de IA crean scaffolds con Better Fullstack y publica los resultados en la página de inicio, añade .NET como ecosistema de primera clase en el nuevo grafo de stacks y entrega una instalación mucho más ligera. También corrige cuatro errores de scaffold que descubrió el propio benchmark.`)
};

const zh_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这个版本衡量 AI 代理如何使用 Better Fullstack 生成 scaffold，并把结果发布到首页；同时在新的 stack graph 中加入一等 .NET 生态，并带来更轻的安装包。它还修复了 benchmark 本身发现的四个 scaffold 问题。`)
};

const ja_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このリリースでは、AI エージェントが Better Fullstack でどのようにスキャフォールディングするかをベンチマークし、その結果をホームページで公開し、新しいスタック グラフにファーストクラスのエコシステムとして .NET を追加し、より無駄のないインストールを出荷します。また、ベンチマーク自体が発見した 4 つの足場のバグも修正されています。`)
};

const ko_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 릴리스에서는 AI 에이전트가 Better Fullstack을 사용하여 스캐폴드하고 결과를 홈페이지에 게시하는 방법을 벤치마킹하고, 새 스택 그래프에 .NET을 일류 생태계로 추가하고, 훨씬 더 간결한 설치를 제공합니다. 또한 벤치마크 자체에서 발견한 4가지 스캐폴드 버그도 수정합니다.`)
};

const zh_hant1_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`這個版本衡量 AI 代理程式如何使用 Better Fullstack 產生 scaffold，並將結果發佈到首頁；同時在新的 stack graph 中加入一等 .NET 生態，並帶來更輕的安裝包。它還修復了 benchmark 本身發現的四個 scaffold 問題。`)
};

const de_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diese Version misst, wie AI-Agenten mit Better Fullstack ein Gerüst bilden, veröffentlicht die Ergebnisse auf der Homepage, fügt .NET als erstklassiges Ökosystem zum neuen Stapeldiagramm hinzu und liefert eine viel schlankere Installation. Es behebt außerdem vier Gerüstfehler, die der Benchmark selbst aufgedeckt hat.`)
};

const fr_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cette version évalue la façon dont les agents AI s'articulent avec Better Fullstack et publie les résultats sur la page d'accueil, ajoute .NET en tant qu'écosystème de première classe sur le nouveau graphique de pile et fournit une installation beaucoup plus simple. Il corrige également quatre bugs d’échafaudage découverts par le benchmark lui-même.`)
};

/**
* | output |
* | --- |
* | "This release benchmarks how AI agents scaffold with Better Fullstack and publishes the results on the homepage, adds .NET as a first-class ecosystem on the n..." |
*
* @param {Changelogrelease20260612summary2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612summary2 = /** @type {((inputs?: Changelogrelease20260612summary2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612summary2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612summary2(inputs)
	if (locale === "es") return es_changelogrelease20260612summary2(inputs)
	if (locale === "zh") return zh_changelogrelease20260612summary2(inputs)
	if (locale === "ja") return ja_changelogrelease20260612summary2(inputs)
	if (locale === "ko") return ko_changelogrelease20260612summary2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612summary2(inputs)
	if (locale === "de") return de_changelogrelease20260612summary2(inputs)
	return fr_changelogrelease20260612summary2(inputs)
});
export { changelogrelease20260612summary2 as "changelogRelease20260612Summary" }