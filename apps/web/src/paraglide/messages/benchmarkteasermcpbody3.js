/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Benchmarkteasermcpbody3Inputs */

const en_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The difference is our MCP. Point any coding agent at Better-Fullstack's tools and even a small free model builds almost everything — with a fraction of the tokens and steps.`)
};

const es_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La diferencia es nuestro MCP. Conecta cualquier agente de programación a las herramientas de Better-Fullstack y hasta un pequeño modelo gratuito construye casi todo, con una fracción de los tokens y los pasos.`)
};

const zh_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`差别在于我们的 MCP。让任何编程代理接入 Better-Fullstack 的工具，即使是小型免费模型也能用极少的 tokens 和步骤构建几乎一切。`)
};

const ja_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`違いは私たちのMCPです。あらゆるコーディングエージェントをBetter-Fullstackのツールに向ければ、小さな無料モデルでもわずかなトークンとステップでほぼすべてを構築します。`)
};

const ko_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`차이는 우리의 MCP입니다. 어떤 코딩 에이전트든 Better-Fullstack 도구에 연결하면 작은 무료 모델조차 훨씬 적은 토큰과 단계로 거의 모든 것을 만들어 냅니다.`)
};

const zh_hant1_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`差別在於我們的 MCP。讓任何程式設計代理接入 Better-Fullstack 的工具，即使是小型免費模型也能用極少的 tokens 和步驟建構幾乎一切。`)
};

const de_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Unterschied ist unser MCP. Richte einen beliebigen Coding-Agenten auf die Tools von Better-Fullstack und selbst ein kleines kostenloses Modell baut fast alles – mit einem Bruchteil der Tokens und Schritte.`)
};

const fr_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La différence, c'est notre MCP. Connectez n'importe quel agent de codage aux outils de Better-Fullstack et même un petit modèle gratuit construit presque tout, avec une fraction des jetons et des étapes.`)
};

const uk_benchmarkteasermcpbody3 = /** @type {(inputs: Benchmarkteasermcpbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Різниця — у нашому MCP. Спрямуйте будь-якого агента для коду на інструменти Better-Fullstack, і навіть маленька безкоштовна модель збудує майже все — з часткою токенів і кроків.`)
};

/**
* | output |
* | --- |
* | "The difference is our MCP. Point any coding agent at Better-Fullstack's tools and even a small free model builds almost everything — with a fraction of the t..." |
*
* @param {Benchmarkteasermcpbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const benchmarkteasermcpbody3 = /** @type {((inputs?: Benchmarkteasermcpbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Benchmarkteasermcpbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_benchmarkteasermcpbody3(inputs)
	if (locale === "es") return es_benchmarkteasermcpbody3(inputs)
	if (locale === "zh") return zh_benchmarkteasermcpbody3(inputs)
	if (locale === "ja") return ja_benchmarkteasermcpbody3(inputs)
	if (locale === "ko") return ko_benchmarkteasermcpbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_benchmarkteasermcpbody3(inputs)
	if (locale === "de") return de_benchmarkteasermcpbody3(inputs)
	if (locale === "fr") return fr_benchmarkteasermcpbody3(inputs)
	return uk_benchmarkteasermcpbody3(inputs)
});
export { benchmarkteasermcpbody3 as "benchmarkTeaserMcpBody" }