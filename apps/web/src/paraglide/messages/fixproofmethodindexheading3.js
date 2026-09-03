/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodindexheading3Inputs */

const en_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const es_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const zh_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const ja_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const ko_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const zh_hant1_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const de_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const fr_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const uk_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

/**
* | output |
* | --- |
* | "The two indexes" |
*
* @param {Fixproofmethodindexheading3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodindexheading3 = /** @type {((inputs?: Fixproofmethodindexheading3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodindexheading3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodindexheading3(inputs)
	if (locale === "zh") return zh_fixproofmethodindexheading3(inputs)
	if (locale === "ja") return ja_fixproofmethodindexheading3(inputs)
	if (locale === "ko") return ko_fixproofmethodindexheading3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodindexheading3(inputs)
	if (locale === "de") return de_fixproofmethodindexheading3(inputs)
	if (locale === "fr") return fr_fixproofmethodindexheading3(inputs)
	if (locale === "uk") return uk_fixproofmethodindexheading3(inputs)
	return en_fixproofmethodindexheading3(inputs)
});
export { fixproofmethodindexheading3 as "fixproofMethodIndexHeading" }