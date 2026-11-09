/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Buildersearchlabel2Inputs */



/**
* | output |
* | --- |
* | "Search {ecosystem} libraries and sections" |
*
* @param {Buildersearchlabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersearchlabel2 = /** @type {((inputs: Buildersearchlabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersearchlabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Buscar bibliotecas y secciones de ${i?.ecosystem}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`搜索 ${i?.ecosystem} 库和分类`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} のライブラリとセクションを検索`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem} 라이브러리 및 섹션 검색`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`搜尋 ${i?.ecosystem} 程式庫和分類`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Bibliotheken und Bereiche in ${i?.ecosystem} durchsuchen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Rechercher des bibliothèques et sections ${i?.ecosystem}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Пошук бібліотек і розділів ${i?.ecosystem}`)
	return /** @type {LocalizedString} */ (`Search ${i?.ecosystem} libraries and sections`)
});
export { buildersearchlabel2 as "builderSearchLabel" }