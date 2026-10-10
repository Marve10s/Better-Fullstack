/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoobservability5Inputs */

const en_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go observability.`)
};

const es_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilidad en Go.`)
};

const zh_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 可观测性。`)
};

const ja_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のオブザーバビリティ。`)
};

const ko_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 관측성.`)
};

const zh_hant1_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 可觀測性。`)
};

const de_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observability für Go.`)
};

const fr_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilité Go.`)
};

const uk_docsclisummarygogoobservability5 = /** @type {(inputs: Docsclisummarygogoobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спостережуваність у Go.`)
};

/**
* | output |
* | --- |
* | "Go observability." |
*
* @param {Docsclisummarygogoobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoobservability5 = /** @type {((inputs?: Docsclisummarygogoobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogoobservability5(inputs)
	if (locale === "zh") return zh_docsclisummarygogoobservability5(inputs)
	if (locale === "ja") return ja_docsclisummarygogoobservability5(inputs)
	if (locale === "ko") return ko_docsclisummarygogoobservability5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogoobservability5(inputs)
	if (locale === "de") return de_docsclisummarygogoobservability5(inputs)
	if (locale === "fr") return fr_docsclisummarygogoobservability5(inputs)
	if (locale === "uk") return uk_docsclisummarygogoobservability5(inputs)
	return en_docsclisummarygogoobservability5(inputs)
});
export { docsclisummarygogoobservability5 as "docsCliSummaryGoGoObservability" }