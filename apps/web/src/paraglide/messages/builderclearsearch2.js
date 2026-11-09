/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderclearsearch2Inputs */



/**
* | output |
* | --- |
* | "Clear search" |
*
* @param {Builderclearsearch2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderclearsearch2 = /** @type {((inputs?: Builderclearsearch2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderclearsearch2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Borrar búsqueda")
	if (locale === "zh") return /** @type {LocalizedString} */ ("清除搜索")
	if (locale === "ja") return /** @type {LocalizedString} */ ("検索をクリア")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검색 지우기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("清除搜尋")
	if (locale === "de") return /** @type {LocalizedString} */ ("Suche löschen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Effacer la recherche")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Очистити пошук")
	return /** @type {LocalizedString} */ ("Clear search")
});
export { builderclearsearch2 as "builderClearSearch" }