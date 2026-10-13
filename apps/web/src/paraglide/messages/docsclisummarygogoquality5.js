/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoquality5Inputs */

const en_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go code quality.`)
};

const es_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Calidad de código Go.`)
};

const zh_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 代码质量。`)
};

const ja_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のコード品質。`)
};

const ko_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 코드 품질.`)
};

const zh_hant1_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 程式碼品質。`)
};

const de_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Codequalität für Go.`)
};

const fr_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Qualité du code Go.`)
};

const uk_docsclisummarygogoquality5 = /** @type {(inputs: Docsclisummarygogoquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Якість коду Go.`)
};

/**
* | output |
* | --- |
* | "Go code quality." |
*
* @param {Docsclisummarygogoquality5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoquality5 = /** @type {((inputs?: Docsclisummarygogoquality5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoquality5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogoquality5(inputs)
	if (locale === "zh") return zh_docsclisummarygogoquality5(inputs)
	if (locale === "ja") return ja_docsclisummarygogoquality5(inputs)
	if (locale === "ko") return ko_docsclisummarygogoquality5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogoquality5(inputs)
	if (locale === "de") return de_docsclisummarygogoquality5(inputs)
	if (locale === "fr") return fr_docsclisummarygogoquality5(inputs)
	if (locale === "uk") return uk_docsclisummarygogoquality5(inputs)
	return en_docsclisummarygogoquality5(inputs)
});
export { docsclisummarygogoquality5 as "docsCliSummaryGoGoQuality" }