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

/**
* | output |
* | --- |
* | "fast + reliable ↗" |
*
* @param {Llmfastreliable2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmfastreliable2 = /** @type {((inputs?: Llmfastreliable2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmfastreliable2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmfastreliable2(inputs)
	if (locale === "es") return es_llmfastreliable2(inputs)
	return zh_llmfastreliable2(inputs)
});
export { llmfastreliable2 as "llmFastReliable" }