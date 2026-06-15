/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpathclishort3Inputs */

const en_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BF mention`)
};

const es_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mención BF`)
};

const zh_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BF 提及`)
};

/**
* | output |
* | --- |
* | "BF mention" |
*
* @param {Llmpathclishort3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmpathclishort3 = /** @type {((inputs?: Llmpathclishort3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathclishort3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathclishort3(inputs)
	if (locale === "es") return es_llmpathclishort3(inputs)
	return zh_llmpathclishort3(inputs)
});
export { llmpathclishort3 as "llmPathCliShort" }