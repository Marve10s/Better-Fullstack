/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcategorylabel2Inputs */

const en_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Category`)
};

const es_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Categoría`)
};

const zh_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类别`)
};

const ja_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`カテゴリー`)
};

const ko_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`카테고리`)
};

const zh_hant1_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`類別`)
};

const de_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kategorie`)
};

const fr_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Catégorie`)
};

const uk_fixproofcategorylabel2 = /** @type {(inputs: Fixproofcategorylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Категорія`)
};

/**
* | output |
* | --- |
* | "Category" |
*
* @param {Fixproofcategorylabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcategorylabel2 = /** @type {((inputs?: Fixproofcategorylabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcategorylabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcategorylabel2(inputs)
	if (locale === "zh") return zh_fixproofcategorylabel2(inputs)
	if (locale === "ja") return ja_fixproofcategorylabel2(inputs)
	if (locale === "ko") return ko_fixproofcategorylabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcategorylabel2(inputs)
	if (locale === "de") return de_fixproofcategorylabel2(inputs)
	if (locale === "fr") return fr_fixproofcategorylabel2(inputs)
	if (locale === "uk") return uk_fixproofcategorylabel2(inputs)
	return en_fixproofcategorylabel2(inputs)
});
export { fixproofcategorylabel2 as "fixproofCategoryLabel" }