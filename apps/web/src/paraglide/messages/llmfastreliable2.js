/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmfastreliable2Inputs */

const en_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`fast + reliable ↗`)
};

const es_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`rápido + fiable ↗`)
};

const zh_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快速 + 可靠 ↗`)
};

const ja_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`高速 + 信頼性の高い ↗`)
};

const ko_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빠르고 안정적 ​​↗`)
};

const zh_hant1_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快 + 可靠 ↗`)
};

const de_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`schnell + zuverlässig ↗`)
};

const fr_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`rapide + fiable ↗`)
};

const uk_llmfastreliable2 = /** @type {(inputs: Llmfastreliable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`швидко + надійно ↗`)
};

/**
* | output |
* | --- |
* | "fast + reliable ↗" |
*
* @param {Llmfastreliable2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmfastreliable2 = /** @type {((inputs?: Llmfastreliable2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmfastreliable2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmfastreliable2(inputs)
	if (locale === "es") return es_llmfastreliable2(inputs)
	if (locale === "zh") return zh_llmfastreliable2(inputs)
	if (locale === "ja") return ja_llmfastreliable2(inputs)
	if (locale === "ko") return ko_llmfastreliable2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmfastreliable2(inputs)
	if (locale === "de") return de_llmfastreliable2(inputs)
	if (locale === "fr") return fr_llmfastreliable2(inputs)
	return uk_llmfastreliable2(inputs)
});
export { llmfastreliable2 as "llmFastReliable" }