/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclosesearch2Inputs */



/**
* | output |
* | --- |
* | "Close search" |
*
* @param {Docsclosesearch2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclosesearch2 = /** @type {((inputs?: Docsclosesearch2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclosesearch2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cerrar búsqueda")
	if (locale === "zh") return /** @type {LocalizedString} */ ("关闭搜索")
	if (locale === "ja") return /** @type {LocalizedString} */ ("検索を閉じる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검색 닫기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("關閉搜尋")
	if (locale === "de") return /** @type {LocalizedString} */ ("Suche schließen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fermer la recherche")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Закрити пошук")
	return /** @type {LocalizedString} */ ("Close search")
});
export { docsclosesearch2 as "docsCloseSearch" }