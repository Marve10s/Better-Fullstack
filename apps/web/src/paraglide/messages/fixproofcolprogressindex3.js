/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolprogressindex3Inputs */

const en_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

const es_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

const zh_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

const ja_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

const ko_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

const zh_hant1_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

const de_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

const fr_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

const uk_fixproofcolprogressindex3 = /** @type {(inputs: Fixproofcolprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress index`)
};

/**
* | output |
* | --- |
* | "Progress index" |
*
* @param {Fixproofcolprogressindex3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolprogressindex3 = /** @type {((inputs?: Fixproofcolprogressindex3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolprogressindex3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolprogressindex3(inputs)
	if (locale === "zh") return zh_fixproofcolprogressindex3(inputs)
	if (locale === "ja") return ja_fixproofcolprogressindex3(inputs)
	if (locale === "ko") return ko_fixproofcolprogressindex3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolprogressindex3(inputs)
	if (locale === "de") return de_fixproofcolprogressindex3(inputs)
	if (locale === "fr") return fr_fixproofcolprogressindex3(inputs)
	if (locale === "uk") return uk_fixproofcolprogressindex3(inputs)
	return en_fixproofcolprogressindex3(inputs)
});
export { fixproofcolprogressindex3 as "fixproofColProgressIndex" }