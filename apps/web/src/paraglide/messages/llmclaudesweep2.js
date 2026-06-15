/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmclaudesweep2Inputs */

const en_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jun 12 sweep`)
};

const es_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Barrido del 12 jun`)
};

const zh_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6 月 12 日批测`)
};

/**
* | output |
* | --- |
* | "Jun 12 sweep" |
*
* @param {Llmclaudesweep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmclaudesweep2 = /** @type {((inputs?: Llmclaudesweep2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmclaudesweep2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmclaudesweep2(inputs)
	if (locale === "es") return es_llmclaudesweep2(inputs)
	return zh_llmclaudesweep2(inputs)
});
export { llmclaudesweep2 as "llmClaudeSweep" }