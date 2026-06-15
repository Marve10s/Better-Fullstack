/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmerrorrate2Inputs */

const en_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Error rate`)
};

const es_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasa de error`)
};

const zh_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`错误率`)
};

/**
* | output |
* | --- |
* | "Error rate" |
*
* @param {Llmerrorrate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmerrorrate2 = /** @type {((inputs?: Llmerrorrate2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmerrorrate2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmerrorrate2(inputs)
	if (locale === "es") return es_llmerrorrate2(inputs)
	return zh_llmerrorrate2(inputs)
});
export { llmerrorrate2 as "llmErrorRate" }