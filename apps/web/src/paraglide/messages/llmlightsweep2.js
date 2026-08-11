/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmlightsweep2Inputs */

const en_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jun 12 light sweep`)
};

const es_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Barrido ligero del 12 jun`)
};

const zh_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6 月 12 日轻量批测`)
};

const ja_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6月12日 ライトスイープ`)
};

const ko_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6월 12일 라이트 스윕`)
};

const zh_hant1_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6 月 12 日輕量批測`)
};

const de_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`12. Juni leichter Sweep`)
};

const fr_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Balayage léger du 12 juin`)
};

const uk_llmlightsweep2 = /** @type {(inputs: Llmlightsweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`легкий прогін 12 червня`)
};

/**
* | output |
* | --- |
* | "Jun 12 light sweep" |
*
* @param {Llmlightsweep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmlightsweep2 = /** @type {((inputs?: Llmlightsweep2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmlightsweep2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_llmlightsweep2(inputs)
	if (locale === "zh") return zh_llmlightsweep2(inputs)
	if (locale === "ja") return ja_llmlightsweep2(inputs)
	if (locale === "ko") return ko_llmlightsweep2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmlightsweep2(inputs)
	if (locale === "de") return de_llmlightsweep2(inputs)
	if (locale === "fr") return fr_llmlightsweep2(inputs)
	if (locale === "uk") return uk_llmlightsweep2(inputs)
	return en_llmlightsweep2(inputs)
});
export { llmlightsweep2 as "llmLightSweep" }