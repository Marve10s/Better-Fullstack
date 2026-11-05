/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchfailed2Inputs */

const en_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search couldn't load.`)
};

const es_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo cargar la búsqueda.`)
};

const zh_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索加载失败。`)
};

const ja_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`検索を読み込めませんでした。`)
};

const ko_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검색을 불러오지 못했습니다.`)
};

const zh_hant1_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜尋載入失敗。`)
};

const de_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suche konnte nicht geladen werden.`)
};

const fr_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La recherche n'a pas pu être chargée.`)
};

const uk_docssearchfailed2 = /** @type {(inputs: Docssearchfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не вдалося завантажити пошук.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docssearchfailed2(inputs)
	if (locale === "zh") return zh_docssearchfailed2(inputs)
	if (locale === "ja") return ja_docssearchfailed2(inputs)
	if (locale === "ko") return ko_docssearchfailed2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchfailed2(inputs)
	if (locale === "de") return de_docssearchfailed2(inputs)
	if (locale === "fr") return fr_docssearchfailed2(inputs)
	if (locale === "uk") return uk_docssearchfailed2(inputs)
	return en_docssearchfailed2(inputs)
});
export { docssearchfailed2 as "docsSearchFailed" }