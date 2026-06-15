/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmoutputtokens2Inputs */

const en_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output tokens per scaffold`)
};

const es_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens de salida por scaffold`)
};

const zh_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每次 scaffold 输出 tokens`)
};

/**
* | output |
* | --- |
* | "Output tokens per scaffold" |
*
* @param {Llmoutputtokens2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmoutputtokens2 = /** @type {((inputs?: Llmoutputtokens2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmoutputtokens2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmoutputtokens2(inputs)
	if (locale === "es") return es_llmoutputtokens2(inputs)
	return zh_llmoutputtokens2(inputs)
});
export { llmoutputtokens2 as "llmOutputTokens" }