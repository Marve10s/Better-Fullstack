/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodtaskheading3Inputs */

const en_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

const es_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

const zh_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

const ja_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

const ko_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

const zh_hant1_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

const de_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

const fr_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

const uk_fixproofmethodtaskheading3 = /** @type {(inputs: Fixproofmethodtaskheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task anatomy`)
};

/**
* | output |
* | --- |
* | "Task anatomy" |
*
* @param {Fixproofmethodtaskheading3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodtaskheading3 = /** @type {((inputs?: Fixproofmethodtaskheading3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodtaskheading3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodtaskheading3(inputs)
	if (locale === "zh") return zh_fixproofmethodtaskheading3(inputs)
	if (locale === "ja") return ja_fixproofmethodtaskheading3(inputs)
	if (locale === "ko") return ko_fixproofmethodtaskheading3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodtaskheading3(inputs)
	if (locale === "de") return de_fixproofmethodtaskheading3(inputs)
	if (locale === "fr") return fr_fixproofmethodtaskheading3(inputs)
	if (locale === "uk") return uk_fixproofmethodtaskheading3(inputs)
	return en_fixproofmethodtaskheading3(inputs)
});
export { fixproofmethodtaskheading3 as "fixproofMethodTaskHeading" }