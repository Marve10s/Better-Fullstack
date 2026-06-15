/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmruninterminal3Inputs */

const en_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`run in your terminal`)
};

const es_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ejecuta en tu terminal`)
};

const zh_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在终端运行`)
};

/**
* | output |
* | --- |
* | "run in your terminal" |
*
* @param {Llmruninterminal3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmruninterminal3 = /** @type {((inputs?: Llmruninterminal3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmruninterminal3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmruninterminal3(inputs)
	if (locale === "es") return es_llmruninterminal3(inputs)
	return zh_llmruninterminal3(inputs)
});
export { llmruninterminal3 as "llmRunInTerminal" }