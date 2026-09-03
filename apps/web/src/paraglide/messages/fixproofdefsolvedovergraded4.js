/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefsolvedovergraded4Inputs */

const en_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const es_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const zh_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const ja_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const ko_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const zh_hant1_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const de_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const fr_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const uk_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

/**
* | output |
* | --- |
* | "Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator." |
*
* @param {Fixproofdefsolvedovergraded4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefsolvedovergraded4 = /** @type {((inputs?: Fixproofdefsolvedovergraded4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefsolvedovergraded4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefsolvedovergraded4(inputs)
	if (locale === "zh") return zh_fixproofdefsolvedovergraded4(inputs)
	if (locale === "ja") return ja_fixproofdefsolvedovergraded4(inputs)
	if (locale === "ko") return ko_fixproofdefsolvedovergraded4(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefsolvedovergraded4(inputs)
	if (locale === "de") return de_fixproofdefsolvedovergraded4(inputs)
	if (locale === "fr") return fr_fixproofdefsolvedovergraded4(inputs)
	if (locale === "uk") return uk_fixproofdefsolvedovergraded4(inputs)
	return en_fixproofdefsolvedovergraded4(inputs)
});
export { fixproofdefsolvedovergraded4 as "fixproofDefSolvedOverGraded" }