/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmtrymcp2Inputs */

const en_llmtrymcp2 = /** @type {(inputs: Llmtrymcp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try out MCP`)
};

const es_llmtrymcp2 = /** @type {(inputs: Llmtrymcp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Probar MCP`)
};

const zh_llmtrymcp2 = /** @type {(inputs: Llmtrymcp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`试用 MCP`)
};

const ja_llmtrymcp2 = /** @type {(inputs: Llmtrymcp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP を試してみる`)
};

const ko_llmtrymcp2 = /** @type {(inputs: Llmtrymcp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP을 사용해 보세요.`)
};

const zh_hant1_llmtrymcp2 = /** @type {(inputs: Llmtrymcp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`試試 MCP`)
};

const de_llmtrymcp2 = /** @type {(inputs: Llmtrymcp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Probieren Sie MCP aus`)
};

const fr_llmtrymcp2 = /** @type {(inputs: Llmtrymcp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Essayez MCP`)
};

/**
* | output |
* | --- |
* | "Try out MCP" |
*
* @param {Llmtrymcp2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmtrymcp2 = /** @type {((inputs?: Llmtrymcp2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmtrymcp2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmtrymcp2(inputs)
	if (locale === "es") return es_llmtrymcp2(inputs)
	if (locale === "zh") return zh_llmtrymcp2(inputs)
	if (locale === "ja") return ja_llmtrymcp2(inputs)
	if (locale === "ko") return ko_llmtrymcp2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmtrymcp2(inputs)
	if (locale === "de") return de_llmtrymcp2(inputs)
	return fr_llmtrymcp2(inputs)
});
export { llmtrymcp2 as "llmTryMcp" }