/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowtitleb3Inputs */

const en_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`It builds.`)
};

const es_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Él construye.`)
};

const zh_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`它来构建。`)
};

/**
* | output |
* | --- |
* | "It builds." |
*
* @param {Mcpworkflowtitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowtitleb3 = /** @type {((inputs?: Mcpworkflowtitleb3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowtitleb3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowtitleb3(inputs)
	if (locale === "es") return es_mcpworkflowtitleb3(inputs)
	return zh_mcpworkflowtitleb3(inputs)
});
export { mcpworkflowtitleb3 as "mcpWorkflowTitleB" }