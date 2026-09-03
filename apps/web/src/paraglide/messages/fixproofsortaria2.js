/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ column: NonNullable<unknown> }} Fixproofsortaria2Inputs */

const en_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Sort by ${i?.column}`)
};

const es_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Ordenar por ${i?.column}`)
};

const zh_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`按 ${i?.column} 排序`)
};

const ja_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.column} で並べ替え`)
};

const ko_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.column} 기준 정렬`)
};

const zh_hant1_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`按 ${i?.column} 排序`)
};

const de_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Nach ${i?.column} sortieren`)
};

const fr_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Trier par ${i?.column}`)
};

const uk_fixproofsortaria2 = /** @type {(inputs: Fixproofsortaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Сортувати за ${i?.column}`)
};

/**
* | output |
* | --- |
* | "Sort by {column}" |
*
* @param {Fixproofsortaria2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofsortaria2 = /** @type {((inputs: Fixproofsortaria2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofsortaria2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofsortaria2(inputs)
	if (locale === "zh") return zh_fixproofsortaria2(inputs)
	if (locale === "ja") return ja_fixproofsortaria2(inputs)
	if (locale === "ko") return ko_fixproofsortaria2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofsortaria2(inputs)
	if (locale === "de") return de_fixproofsortaria2(inputs)
	if (locale === "fr") return fr_fixproofsortaria2(inputs)
	if (locale === "uk") return uk_fixproofsortaria2(inputs)
	return en_fixproofsortaria2(inputs)
});
export { fixproofsortaria2 as "fixproofSortAria" }