/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmreadblog2Inputs */

const en_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read the blog`)
};

const es_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer el blog`)
};

const zh_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读博客`)
};

/**
* | output |
* | --- |
* | "Read the blog" |
*
* @param {Llmreadblog2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmreadblog2 = /** @type {((inputs?: Llmreadblog2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmreadblog2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmreadblog2(inputs)
	if (locale === "es") return es_llmreadblog2(inputs)
	return zh_llmreadblog2(inputs)
});
export { llmreadblog2 as "llmReadBlog" }