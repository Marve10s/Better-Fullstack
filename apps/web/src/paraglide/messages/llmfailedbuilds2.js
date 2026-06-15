/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmfailedbuilds2Inputs */

const en_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed builds`)
};

const es_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builds fallidos`)
};

const zh_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失败构建`)
};

/**
* | output |
* | --- |
* | "Failed builds" |
*
* @param {Llmfailedbuilds2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmfailedbuilds2 = /** @type {((inputs?: Llmfailedbuilds2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmfailedbuilds2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmfailedbuilds2(inputs)
	if (locale === "es") return es_llmfailedbuilds2(inputs)
	return zh_llmfailedbuilds2(inputs)
});
export { llmfailedbuilds2 as "llmFailedBuilds" }