/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdeftrials2Inputs */

const en_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const es_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const zh_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const ja_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const ko_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const zh_hant1_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const de_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const fr_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const uk_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

/**
* | output |
* | --- |
* | "Runs per task. One trial is a single sample, so read small differences as noise." |
*
* @param {Fixproofdeftrials2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdeftrials2 = /** @type {((inputs?: Fixproofdeftrials2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdeftrials2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdeftrials2(inputs)
	if (locale === "zh") return zh_fixproofdeftrials2(inputs)
	if (locale === "ja") return ja_fixproofdeftrials2(inputs)
	if (locale === "ko") return ko_fixproofdeftrials2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdeftrials2(inputs)
	if (locale === "de") return de_fixproofdeftrials2(inputs)
	if (locale === "fr") return fr_fixproofdeftrials2(inputs)
	if (locale === "uk") return uk_fixproofdeftrials2(inputs)
	return en_fixproofdeftrials2(inputs)
});
export { fixproofdeftrials2 as "fixproofDefTrials" }