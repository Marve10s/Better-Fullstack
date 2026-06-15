/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmbuildspassing2Inputs */

const en_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builds passing`)
};

const es_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builds que pasan`)
};

const zh_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过构建`)
};

/**
* | output |
* | --- |
* | "Builds passing" |
*
* @param {Llmbuildspassing2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmbuildspassing2 = /** @type {((inputs?: Llmbuildspassing2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmbuildspassing2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmbuildspassing2(inputs)
	if (locale === "es") return es_llmbuildspassing2(inputs)
	return zh_llmbuildspassing2(inputs)
});
export { llmbuildspassing2 as "llmBuildsPassing" }