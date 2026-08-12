/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmcodexsweep2Inputs */

const en_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jun 10 sweep`)
};

const es_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Barrido del 10 jun`)
};

const zh_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6 月 10 日批测`)
};

const ja_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6月10日のスイープ`)
};

const ko_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6월 10일 스윕`)
};

const zh_hant1_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6 月 10 日批測`)
};

const de_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`10. Juni Sweep`)
};

const fr_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Balayage du 10 juin`)
};

const uk_llmcodexsweep2 = /** @type {(inputs: Llmcodexsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`прогін 10 червня`)
};

/**
* | output |
* | --- |
* | "Jun 10 sweep" |
*
* @param {Llmcodexsweep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmcodexsweep2 = /** @type {((inputs?: Llmcodexsweep2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmcodexsweep2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_llmcodexsweep2(inputs)
	if (locale === "zh") return zh_llmcodexsweep2(inputs)
	if (locale === "ja") return ja_llmcodexsweep2(inputs)
	if (locale === "ko") return ko_llmcodexsweep2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmcodexsweep2(inputs)
	if (locale === "de") return de_llmcodexsweep2(inputs)
	if (locale === "fr") return fr_llmcodexsweep2(inputs)
	if (locale === "uk") return uk_llmcodexsweep2(inputs)
	return en_llmcodexsweep2(inputs)
});
export { llmcodexsweep2 as "llmCodexSweep" }