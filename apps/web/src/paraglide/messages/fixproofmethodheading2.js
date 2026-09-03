/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodheading2Inputs */

const en_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Methodology`)
};

const es_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Metodología`)
};

const zh_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`方法论`)
};

const ja_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`方法論`)
};

const ko_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`방법론`)
};

const zh_hant1_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`方法論`)
};

const de_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Methodik`)
};

const fr_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Méthodologie`)
};

const uk_fixproofmethodheading2 = /** @type {(inputs: Fixproofmethodheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Методологія`)
};

/**
* | output |
* | --- |
* | "Methodology" |
*
* @param {Fixproofmethodheading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodheading2 = /** @type {((inputs?: Fixproofmethodheading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodheading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodheading2(inputs)
	if (locale === "zh") return zh_fixproofmethodheading2(inputs)
	if (locale === "ja") return ja_fixproofmethodheading2(inputs)
	if (locale === "ko") return ko_fixproofmethodheading2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodheading2(inputs)
	if (locale === "de") return de_fixproofmethodheading2(inputs)
	if (locale === "fr") return fr_fixproofmethodheading2(inputs)
	if (locale === "uk") return uk_fixproofmethodheading2(inputs)
	return en_fixproofmethodheading2(inputs)
});
export { fixproofmethodheading2 as "fixproofMethodHeading" }