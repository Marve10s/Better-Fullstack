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

/**
* | output |
* | --- |
* | "Jun 10 sweep" |
*
* @param {Llmcodexsweep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmcodexsweep2 = /** @type {((inputs?: Llmcodexsweep2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmcodexsweep2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmcodexsweep2(inputs)
	if (locale === "es") return es_llmcodexsweep2(inputs)
	return zh_llmcodexsweep2(inputs)
});
export { llmcodexsweep2 as "llmCodexSweep" }