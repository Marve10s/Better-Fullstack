/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderclearsearch2Inputs */

const en_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear search`)
};

const es_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Borrar búsqueda`)
};

const zh_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`清除搜索`)
};

const ja_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`検索をクリア`)
};

const ko_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검색 지우기`)
};

const zh_hant1_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`清除搜尋`)
};

const de_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suche löschen`)
};

const fr_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effacer la recherche`)
};

const uk_builderclearsearch2 = /** @type {(inputs: Builderclearsearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Очистити пошук`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderclearsearch2(inputs)
	if (locale === "es") return es_builderclearsearch2(inputs)
	if (locale === "zh") return zh_builderclearsearch2(inputs)
	if (locale === "ja") return ja_builderclearsearch2(inputs)
	if (locale === "ko") return ko_builderclearsearch2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderclearsearch2(inputs)
	if (locale === "de") return de_builderclearsearch2(inputs)
	if (locale === "fr") return fr_builderclearsearch2(inputs)
	return uk_builderclearsearch2(inputs)
});
export { builderclearsearch2 as "builderClearSearch" }