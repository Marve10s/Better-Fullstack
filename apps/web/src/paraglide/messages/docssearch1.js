/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearch1Inputs */



/**
* | output |
* | --- |
* | "Search docs" |
*
* @param {Docssearch1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearch1 = /** @type {((inputs?: Docssearch1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearch1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Buscar docs")
	if (locale === "zh") return /** @type {LocalizedString} */ ("搜索文档")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドキュメントの検索")
	if (locale === "ko") return /** @type {LocalizedString} */ ("문서 검색")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("搜尋文件")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dokumente durchsuchen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Rechercher des documents")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Пошук у документації")
	return /** @type {LocalizedString} */ ("Search docs")
});
export { docssearch1 as "docsSearch" }