/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ column: NonNullable<unknown> }} Fixproofdefinitionaria2Inputs */

const en_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const es_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const zh_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const ja_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const ko_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const zh_hant1_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const de_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const fr_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const uk_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

/**
* | output |
* | --- |
* | "What does {column} mean?" |
*
* @param {Fixproofdefinitionaria2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefinitionaria2 = /** @type {((inputs: Fixproofdefinitionaria2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefinitionaria2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefinitionaria2(inputs)
	if (locale === "zh") return zh_fixproofdefinitionaria2(inputs)
	if (locale === "ja") return ja_fixproofdefinitionaria2(inputs)
	if (locale === "ko") return ko_fixproofdefinitionaria2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefinitionaria2(inputs)
	if (locale === "de") return de_fixproofdefinitionaria2(inputs)
	if (locale === "fr") return fr_fixproofdefinitionaria2(inputs)
	if (locale === "uk") return uk_fixproofdefinitionaria2(inputs)
	return en_fixproofdefinitionaria2(inputs)
});
export { fixproofdefinitionaria2 as "fixproofDefinitionAria" }