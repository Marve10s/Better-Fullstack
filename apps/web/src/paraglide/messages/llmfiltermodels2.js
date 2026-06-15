/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmfiltermodels2Inputs */

const en_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter models`)
};

const es_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filtrar modelos`)
};

const zh_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`筛选模型`)
};

/**
* | output |
* | --- |
* | "Filter models" |
*
* @param {Llmfiltermodels2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmfiltermodels2 = /** @type {((inputs?: Llmfiltermodels2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmfiltermodels2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmfiltermodels2(inputs)
	if (locale === "es") return es_llmfiltermodels2(inputs)
	return zh_llmfiltermodels2(inputs)
});
export { llmfiltermodels2 as "llmFilterModels" }