/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcoltrials2Inputs */

const en_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trials`)
};

const es_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Intentos`)
};

const zh_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`试验次数`)
};

const ja_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`試行数`)
};

const ko_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시도`)
};

const zh_hant1_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`試驗次數`)
};

const de_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Versuche`)
};

const fr_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Essais`)
};

const uk_fixproofcoltrials2 = /** @type {(inputs: Fixproofcoltrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спроби`)
};

/**
* | output |
* | --- |
* | "Trials" |
*
* @param {Fixproofcoltrials2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcoltrials2 = /** @type {((inputs?: Fixproofcoltrials2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcoltrials2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcoltrials2(inputs)
	if (locale === "zh") return zh_fixproofcoltrials2(inputs)
	if (locale === "ja") return ja_fixproofcoltrials2(inputs)
	if (locale === "ko") return ko_fixproofcoltrials2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcoltrials2(inputs)
	if (locale === "de") return de_fixproofcoltrials2(inputs)
	if (locale === "fr") return fr_fixproofcoltrials2(inputs)
	if (locale === "uk") return uk_fixproofcoltrials2(inputs)
	return en_fixproofcoltrials2(inputs)
});
export { fixproofcoltrials2 as "fixproofColTrials" }