/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navanalytics1Inputs */

const en_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Analytics`)
};

const es_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Analítica`)
};

const zh_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分析`)
};

const ja_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分析`)
};

const ko_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`분석`)
};

const zh_hant1_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分析`)
};

const de_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Analysen`)
};

const fr_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Analytique`)
};

const uk_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Аналітика`)
};

/**
* | output |
* | --- |
* | "Analytics" |
*
* @param {Navanalytics1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navanalytics1 = /** @type {((inputs?: Navanalytics1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navanalytics1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_navanalytics1(inputs)
	if (locale === "zh") return zh_navanalytics1(inputs)
	if (locale === "ja") return ja_navanalytics1(inputs)
	if (locale === "ko") return ko_navanalytics1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navanalytics1(inputs)
	if (locale === "de") return de_navanalytics1(inputs)
	if (locale === "fr") return fr_navanalytics1(inputs)
	if (locale === "uk") return uk_navanalytics1(inputs)
	return en_navanalytics1(inputs)
});
export { navanalytics1 as "navAnalytics" }