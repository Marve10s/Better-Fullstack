/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomefailed2Inputs */

const en_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const es_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const zh_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const ja_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const ko_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const zh_hant1_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const de_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const fr_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const uk_fixproofoutcomefailed2 = /** @type {(inputs: Fixproofoutcomefailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

/**
* | output |
* | --- |
* | "Failed" |
*
* @param {Fixproofoutcomefailed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomefailed2 = /** @type {((inputs?: Fixproofoutcomefailed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomefailed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomefailed2(inputs)
	if (locale === "zh") return zh_fixproofoutcomefailed2(inputs)
	if (locale === "ja") return ja_fixproofoutcomefailed2(inputs)
	if (locale === "ko") return ko_fixproofoutcomefailed2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomefailed2(inputs)
	if (locale === "de") return de_fixproofoutcomefailed2(inputs)
	if (locale === "fr") return fr_fixproofoutcomefailed2(inputs)
	if (locale === "uk") return uk_fixproofoutcomefailed2(inputs)
	return en_fixproofoutcomefailed2(inputs)
});
export { fixproofoutcomefailed2 as "fixproofOutcomeFailed" }