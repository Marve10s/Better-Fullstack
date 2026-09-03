/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofclaim1Inputs */

const en_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const es_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const zh_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const ja_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const ko_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const zh_hant1_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const de_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const fr_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const uk_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

/**
* | output |
* | --- |
* | "Real issues from private codebases, sealed. Hidden tests decide." |
*
* @param {Fixproofclaim1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofclaim1 = /** @type {((inputs?: Fixproofclaim1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofclaim1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofclaim1(inputs)
	if (locale === "zh") return zh_fixproofclaim1(inputs)
	if (locale === "ja") return ja_fixproofclaim1(inputs)
	if (locale === "ko") return ko_fixproofclaim1(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofclaim1(inputs)
	if (locale === "de") return de_fixproofclaim1(inputs)
	if (locale === "fr") return fr_fixproofclaim1(inputs)
	if (locale === "uk") return uk_fixproofclaim1(inputs)
	return en_fixproofclaim1(inputs)
});
export { fixproofclaim1 as "fixproofClaim" }