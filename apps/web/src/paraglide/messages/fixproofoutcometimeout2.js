/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcometimeout2Inputs */

const en_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

const es_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

const zh_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

const ja_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

const ko_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

const zh_hant1_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

const de_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

const fr_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

const uk_fixproofoutcometimeout2 = /** @type {(inputs: Fixproofoutcometimeout2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Timeout`)
};

/**
* | output |
* | --- |
* | "Timeout" |
*
* @param {Fixproofoutcometimeout2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcometimeout2 = /** @type {((inputs?: Fixproofoutcometimeout2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcometimeout2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcometimeout2(inputs)
	if (locale === "zh") return zh_fixproofoutcometimeout2(inputs)
	if (locale === "ja") return ja_fixproofoutcometimeout2(inputs)
	if (locale === "ko") return ko_fixproofoutcometimeout2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcometimeout2(inputs)
	if (locale === "de") return de_fixproofoutcometimeout2(inputs)
	if (locale === "fr") return fr_fixproofoutcometimeout2(inputs)
	if (locale === "uk") return uk_fixproofoutcometimeout2(inputs)
	return en_fixproofoutcometimeout2(inputs)
});
export { fixproofoutcometimeout2 as "fixproofOutcomeTimeout" }