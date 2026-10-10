/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicessearch5Inputs */

const en_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search engine.`)
};

const es_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Motor de búsqueda.`)
};

const zh_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索引擎。`)
};

const ja_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`検索エンジン。`)
};

const ko_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검색 엔진.`)
};

const zh_hant1_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜尋引擎。`)
};

const de_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suchmaschine.`)
};

const fr_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Moteur de recherche.`)
};

const uk_docsclisummarytypescriptservicessearch5 = /** @type {(inputs: Docsclisummarytypescriptservicessearch5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Пошуковий рушій.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicessearch5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicessearch5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicessearch5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicessearch5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicessearch5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicessearch5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicessearch5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicessearch5(inputs)
	return en_docsclisummarytypescriptservicessearch5(inputs)
});
export { docsclisummarytypescriptservicessearch5 as "docsCliSummaryTypescriptServicesSearch" }