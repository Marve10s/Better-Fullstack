/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetobservability5Inputs */

const en_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET observability.`)
};

const es_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilidad en .NET.`)
};

const zh_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 可观测性。`)
};

const ja_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のオブザーバビリティ。`)
};

const ko_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 관측성.`)
};

const zh_hant1_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 可觀測性。`)
};

const de_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observability für .NET.`)
};

const fr_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilité .NET.`)
};

const uk_docsclisummarydotnetdotnetobservability5 = /** @type {(inputs: Docsclisummarydotnetdotnetobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спостережуваність у .NET.`)
};

/**
* | output |
* | --- |
* | ".NET observability." |
*
* @param {Docsclisummarydotnetdotnetobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetobservability5 = /** @type {((inputs?: Docsclisummarydotnetdotnetobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetobservability5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetobservability5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetobservability5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetobservability5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetobservability5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetobservability5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetobservability5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetobservability5(inputs)
	return en_docsclisummarydotnetdotnetobservability5(inputs)
});
export { docsclisummarydotnetdotnetobservability5 as "docsCliSummaryDotnetDotnetObservability" }