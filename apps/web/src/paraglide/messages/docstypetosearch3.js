/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstypetosearch3Inputs */



/**
* | output |
* | --- |
* | "Type to search" |
*
* @param {Docstypetosearch3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstypetosearch3 = /** @type {((inputs?: Docstypetosearch3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstypetosearch3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Escribe para buscar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("输入内容开始搜索")
	if (locale === "ja") return /** @type {LocalizedString} */ ("入力して検索します")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검색하려면 입력하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("輸入內容開始搜尋")
	if (locale === "de") return /** @type {LocalizedString} */ ("Geben Sie ein, um zu suchen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Tapez pour rechercher")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Почніть вводити запит")
	return /** @type {LocalizedString} */ ("Type to search")
});
export { docstypetosearch3 as "docsTypeToSearch" }