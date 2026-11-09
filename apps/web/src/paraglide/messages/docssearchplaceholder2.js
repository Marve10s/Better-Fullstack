/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchplaceholder2Inputs */



/**
* | output |
* | --- |
* | "Search docs..." |
*
* @param {Docssearchplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchplaceholder2 = /** @type {((inputs?: Docssearchplaceholder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchplaceholder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Buscar docs...")
	if (locale === "zh") return /** @type {LocalizedString} */ ("搜索文档...")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドキュメントを検索...")
	if (locale === "ko") return /** @type {LocalizedString} */ ("문서 검색...")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("搜尋文件...")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dokumente durchsuchen...")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Rechercher des documents...")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шукати в документації...")
	return /** @type {LocalizedString} */ ("Search docs...")
});
export { docssearchplaceholder2 as "docsSearchPlaceholder" }