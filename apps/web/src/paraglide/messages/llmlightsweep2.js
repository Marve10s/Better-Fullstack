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

/**
* | output |
* | --- |
* | "Jun 12 light sweep" |
*
* @param {Llmlightsweep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmlightsweep2 = /** @type {((inputs?: Llmlightsweep2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmlightsweep2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmlightsweep2(inputs)
	if (locale === "es") return es_llmlightsweep2(inputs)
	return zh_llmlightsweep2(inputs)
});
export { llmlightsweep2 as "llmLightSweep" }