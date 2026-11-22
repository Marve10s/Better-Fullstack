/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navanalytics1Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Analítica")
	if (locale === "zh") return /** @type {LocalizedString} */ ("分析")
	if (locale === "ja") return /** @type {LocalizedString} */ ("分析")
	if (locale === "ko") return /** @type {LocalizedString} */ ("분석")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("分析")
	if (locale === "de") return /** @type {LocalizedString} */ ("Analysen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Analytique")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Аналітика")
	return /** @type {LocalizedString} */ ("Analytics")
});
export { navanalytics1 as "navAnalytics" }