/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Buildersearchlabel2Inputs */

const en_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Search ${i?.ecosystem} libraries and sections`)
};

const es_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Buscar bibliotecas y secciones de ${i?.ecosystem}`)
};

const zh_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`搜索 ${i?.ecosystem} 库和分类`)
};

const ja_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} のライブラリとセクションを検索`)
};

const ko_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 라이브러리 및 섹션 검색`)
};

const zh_hant1_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`搜尋 ${i?.ecosystem} 程式庫和分類`)
};

const de_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Bibliotheken und Bereiche in ${i?.ecosystem} durchsuchen`)
};

const fr_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Rechercher des bibliothèques et sections ${i?.ecosystem}`)
};

const uk_buildersearchlabel2 = /** @type {(inputs: Buildersearchlabel2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Пошук бібліотек і розділів ${i?.ecosystem}`)
};

/**
* | output |
* | --- |
* | "Search {ecosystem} libraries and sections" |
*
* @param {Buildersearchlabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersearchlabel2 = /** @type {((inputs: Buildersearchlabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersearchlabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersearchlabel2(inputs)
	if (locale === "es") return es_buildersearchlabel2(inputs)
	if (locale === "zh") return zh_buildersearchlabel2(inputs)
	if (locale === "ja") return ja_buildersearchlabel2(inputs)
	if (locale === "ko") return ko_buildersearchlabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersearchlabel2(inputs)
	if (locale === "de") return de_buildersearchlabel2(inputs)
	if (locale === "fr") return fr_buildersearchlabel2(inputs)
	return uk_buildersearchlabel2(inputs)
});
export { buildersearchlabel2 as "builderSearchLabel" }