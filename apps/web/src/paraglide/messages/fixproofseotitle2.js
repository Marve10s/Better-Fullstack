/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofseotitle2Inputs */

const en_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

const es_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

const zh_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

const ja_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

const ko_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

const zh_hant1_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

const de_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

const fr_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

const uk_fixproofseotitle2 = /** @type {(inputs: Fixproofseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof: sealed coding-agent benchmark`)
};

/**
* | output |
* | --- |
* | "Fixproof: sealed coding-agent benchmark" |
*
* @param {Fixproofseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofseotitle2 = /** @type {((inputs?: Fixproofseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofseotitle2(inputs)
	if (locale === "zh") return zh_fixproofseotitle2(inputs)
	if (locale === "ja") return ja_fixproofseotitle2(inputs)
	if (locale === "ko") return ko_fixproofseotitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofseotitle2(inputs)
	if (locale === "de") return de_fixproofseotitle2(inputs)
	if (locale === "fr") return fr_fixproofseotitle2(inputs)
	if (locale === "uk") return uk_fixproofseotitle2(inputs)
	return en_fixproofseotitle2(inputs)
});
export { fixproofseotitle2 as "fixproofSeoTitle" }