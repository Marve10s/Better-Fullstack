/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Buildersearchplaceholder2Inputs */

const en_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Search ${i?.ecosystem}…`)
};

const es_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Buscar en ${i?.ecosystem}…`)
};

const zh_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`搜索 ${i?.ecosystem}…`)
};

const ja_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} を検索…`)
};

const ko_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 검색…`)
};

const zh_hant1_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`搜尋 ${i?.ecosystem}…`)
};

const de_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} durchsuchen…`)
};

const fr_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Rechercher dans ${i?.ecosystem}…`)
};

const uk_buildersearchplaceholder2 = /** @type {(inputs: Buildersearchplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Пошук у ${i?.ecosystem}…`)
};

/**
* | output |
* | --- |
* | "Search {ecosystem}…" |
*
* @param {Buildersearchplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersearchplaceholder2 = /** @type {((inputs: Buildersearchplaceholder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersearchplaceholder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersearchplaceholder2(inputs)
	if (locale === "es") return es_buildersearchplaceholder2(inputs)
	if (locale === "zh") return zh_buildersearchplaceholder2(inputs)
	if (locale === "ja") return ja_buildersearchplaceholder2(inputs)
	if (locale === "ko") return ko_buildersearchplaceholder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersearchplaceholder2(inputs)
	if (locale === "de") return de_buildersearchplaceholder2(inputs)
	if (locale === "fr") return fr_buildersearchplaceholder2(inputs)
	return uk_buildersearchplaceholder2(inputs)
});
export { buildersearchplaceholder2 as "builderSearchPlaceholder" }