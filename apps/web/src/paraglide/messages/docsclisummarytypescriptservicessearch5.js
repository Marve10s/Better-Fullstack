/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicessearch5Inputs */



/**
* | output |
* | --- |
* | "Search engine." |
*
* @param {Docsclisummarytypescriptservicessearch5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicessearch5 = /** @type {((inputs?: Docsclisummarytypescriptservicessearch5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicessearch5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Motor de búsqueda.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("搜索引擎。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("検索エンジン。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검색 엔진.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("搜尋引擎。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Suchmaschine.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Moteur de recherche.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Пошуковий рушій.")
	return /** @type {LocalizedString} */ ("Search engine.")
});
export { docsclisummarytypescriptservicessearch5 as "docsCliSummaryTypescriptServicesSearch" }