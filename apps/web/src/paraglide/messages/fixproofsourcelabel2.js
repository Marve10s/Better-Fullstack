/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofsourcelabel2Inputs */

const en_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Source`)
};

const es_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Origen`)
};

const zh_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来源`)
};

const ja_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`出所`)
};

const ko_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`출처`)
};

const zh_hant1_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`來源`)
};

const de_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quelle`)
};

const fr_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Origine`)
};

const uk_fixproofsourcelabel2 = /** @type {(inputs: Fixproofsourcelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Джерело`)
};

/**
* | output |
* | --- |
* | "Source" |
*
* @param {Fixproofsourcelabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofsourcelabel2 = /** @type {((inputs?: Fixproofsourcelabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofsourcelabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofsourcelabel2(inputs)
	if (locale === "zh") return zh_fixproofsourcelabel2(inputs)
	if (locale === "ja") return ja_fixproofsourcelabel2(inputs)
	if (locale === "ko") return ko_fixproofsourcelabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofsourcelabel2(inputs)
	if (locale === "de") return de_fixproofsourcelabel2(inputs)
	if (locale === "fr") return fr_fixproofsourcelabel2(inputs)
	if (locale === "uk") return uk_fixproofsourcelabel2(inputs)
	return en_fixproofsourcelabel2(inputs)
});
export { fixproofsourcelabel2 as "fixproofSourceLabel" }