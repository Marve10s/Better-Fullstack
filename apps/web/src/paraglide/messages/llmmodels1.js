/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmmodels1Inputs */

const en_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Models`)
};

const es_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modelos`)
};

const zh_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`模型`)
};

/**
* | output |
* | --- |
* | "Models" |
*
* @param {Llmmodels1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmmodels1 = /** @type {((inputs?: Llmmodels1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmmodels1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmmodels1(inputs)
	if (locale === "es") return es_llmmodels1(inputs)
	return zh_llmmodels1(inputs)
});
export { llmmodels1 as "llmModels" }