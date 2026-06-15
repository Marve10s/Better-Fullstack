/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmtokens1Inputs */

const en_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens`)
};

const es_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens`)
};

const zh_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens`)
};

/**
* | output |
* | --- |
* | "Tokens" |
*
* @param {Llmtokens1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmtokens1 = /** @type {((inputs?: Llmtokens1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmtokens1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmtokens1(inputs)
	if (locale === "es") return es_llmtokens1(inputs)
	return zh_llmtokens1(inputs)
});
export { llmtokens1 as "llmTokens" }