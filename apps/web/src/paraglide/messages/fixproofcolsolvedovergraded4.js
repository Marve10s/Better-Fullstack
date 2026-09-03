/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolsolvedovergraded4Inputs */

const en_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solved / graded`)
};

const es_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resueltas / evaluadas`)
};

const zh_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已解决 / 已评测`)
};

const ja_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`解決 / 採点`)
};

const ko_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`해결 / 채점`)
};

const zh_hant1_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已解決 / 已評測`)
};

const de_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gelöst / bewertet`)
};

const fr_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Résolues / évaluées`)
};

const uk_fixproofcolsolvedovergraded4 = /** @type {(inputs: Fixproofcolsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вирішено / оцінено`)
};

/**
* | output |
* | --- |
* | "Solved / graded" |
*
* @param {Fixproofcolsolvedovergraded4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolsolvedovergraded4 = /** @type {((inputs?: Fixproofcolsolvedovergraded4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolsolvedovergraded4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolsolvedovergraded4(inputs)
	if (locale === "zh") return zh_fixproofcolsolvedovergraded4(inputs)
	if (locale === "ja") return ja_fixproofcolsolvedovergraded4(inputs)
	if (locale === "ko") return ko_fixproofcolsolvedovergraded4(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolsolvedovergraded4(inputs)
	if (locale === "de") return de_fixproofcolsolvedovergraded4(inputs)
	if (locale === "fr") return fr_fixproofcolsolvedovergraded4(inputs)
	if (locale === "uk") return uk_fixproofcolsolvedovergraded4(inputs)
	return en_fixproofcolsolvedovergraded4(inputs)
});
export { fixproofcolsolvedovergraded4 as "fixproofColSolvedOverGraded" }