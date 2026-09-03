/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofsourcepublic2Inputs */

const en_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const es_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const zh_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const ja_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const ko_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const zh_hant1_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const de_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const fr_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const uk_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

/**
* | output |
* | --- |
* | "Public repository" |
*
* @param {Fixproofsourcepublic2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofsourcepublic2 = /** @type {((inputs?: Fixproofsourcepublic2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofsourcepublic2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofsourcepublic2(inputs)
	if (locale === "zh") return zh_fixproofsourcepublic2(inputs)
	if (locale === "ja") return ja_fixproofsourcepublic2(inputs)
	if (locale === "ko") return ko_fixproofsourcepublic2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofsourcepublic2(inputs)
	if (locale === "de") return de_fixproofsourcepublic2(inputs)
	if (locale === "fr") return fr_fixproofsourcepublic2(inputs)
	if (locale === "uk") return uk_fixproofsourcepublic2(inputs)
	return en_fixproofsourcepublic2(inputs)
});
export { fixproofsourcepublic2 as "fixproofSourcePublic" }