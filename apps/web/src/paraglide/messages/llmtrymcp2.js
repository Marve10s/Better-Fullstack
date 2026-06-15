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

/**
* | output |
* | --- |
* | "Try out MCP" |
*
* @param {Llmtrymcp2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmtrymcp2 = /** @type {((inputs?: Llmtrymcp2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmtrymcp2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmtrymcp2(inputs)
	if (locale === "es") return es_llmtrymcp2(inputs)
	return zh_llmtrymcp2(inputs)
});
export { llmtrymcp2 as "llmTryMcp" }