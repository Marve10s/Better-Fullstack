/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmmostefficient2Inputs */

const en_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`most efficient ↗`)
};

const es_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`más eficiente ↗`)
};

const zh_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最高效 ↗`)
};

const ja_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最も効率的 ↗`)
};

const ko_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`가장 효율적 ↗`)
};

const zh_hant1_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最高效 ↗`)
};

const de_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`am effizientesten ↗`)
};

const fr_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`le plus efficace ↗`)
};

const uk_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`найефективніший ↗`)
};

/**
* | output |
* | --- |
* | "most efficient ↗" |
*
* @param {Llmmostefficient2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmmostefficient2 = /** @type {((inputs?: Llmmostefficient2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmmostefficient2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmmostefficient2(inputs)
	if (locale === "es") return es_llmmostefficient2(inputs)
	if (locale === "zh") return zh_llmmostefficient2(inputs)
	if (locale === "ja") return ja_llmmostefficient2(inputs)
	if (locale === "ko") return ko_llmmostefficient2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmmostefficient2(inputs)
	if (locale === "de") return de_llmmostefficient2(inputs)
	if (locale === "fr") return fr_llmmostefficient2(inputs)
	return uk_llmmostefficient2(inputs)
});
export { llmmostefficient2 as "llmMostEfficient" }