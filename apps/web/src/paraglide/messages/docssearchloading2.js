/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchloading2Inputs */



/**
* | output |
* | --- |
* | "Loading search..." |
*
* @param {Docssearchloading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchloading2 = /** @type {((inputs?: Docssearchloading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchloading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cargando búsqueda...")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在加载搜索...")
	if (locale === "ja") return /** @type {LocalizedString} */ ("検索を読み込み中...")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검색 로드 중...")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在加載搜尋...")
	if (locale === "de") return /** @type {LocalizedString} */ ("Suche wird geladen...")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Chargement de la recherche...")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Завантажуємо пошук...")
	return /** @type {LocalizedString} */ ("Loading search...")
});
export { docssearchloading2 as "docsSearchLoading" }