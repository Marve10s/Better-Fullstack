/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesai5Inputs */

const en_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI SDK / agent framework.`)
};

const es_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK de AI / framework de agentes.`)
};

const zh_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI SDK / 代理框架。`)
};

const ja_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI SDK / エージェントフレームワーク。`)
};

const ko_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI SDK / 에이전트 프레임워크.`)
};

const zh_hant1_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI SDK / 代理框架。`)
};

const de_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI-SDK / Agenten-Framework.`)
};

const fr_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK d’AI / framework d’agents.`)
};

const uk_docsclisummarytypescriptservicesai5 = /** @type {(inputs: Docsclisummarytypescriptservicesai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK для AI / фреймворк агентів.`)
};

/**
* | output |
* | --- |
* | "AI SDK / agent framework." |
*
* @param {Docsclisummarytypescriptservicesai5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesai5 = /** @type {((inputs?: Docsclisummarytypescriptservicesai5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesai5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesai5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesai5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesai5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesai5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesai5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesai5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesai5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesai5(inputs)
	return en_docsclisummarytypescriptservicesai5(inputs)
});
export { docsclisummarytypescriptservicesai5 as "docsCliSummaryTypescriptServicesAi" }