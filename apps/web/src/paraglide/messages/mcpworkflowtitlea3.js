/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowtitlea3Inputs */

const en_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`You describe.`)
};

const es_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tú describes.`)
};

const zh_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你来描述。`)
};

/**
* | output |
* | --- |
* | "You describe." |
*
* @param {Mcpworkflowtitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowtitlea3 = /** @type {((inputs?: Mcpworkflowtitlea3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowtitlea3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowtitlea3(inputs)
	if (locale === "es") return es_mcpworkflowtitlea3(inputs)
	return zh_mcpworkflowtitlea3(inputs)
});
export { mcpworkflowtitlea3 as "mcpWorkflowTitleA" }