/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchfailed2Inputs */



/**
* | output |
* | --- |
* | "Search couldn't load." |
*
* @param {Docssearchfailed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchfailed2 = /** @type {((inputs?: Docssearchfailed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchfailed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se pudo cargar la búsqueda.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("搜索加载失败。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("検索を読み込めませんでした。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검색을 불러오지 못했습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("搜尋載入失敗。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Suche konnte nicht geladen werden.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("La recherche n'a pas pu être chargée.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не вдалося завантажити пошук.")
	return /** @type {LocalizedString} */ ("Search couldn't load.")
});
export { docssearchfailed2 as "docsSearchFailed" }