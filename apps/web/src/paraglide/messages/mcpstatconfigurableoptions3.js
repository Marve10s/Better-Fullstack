/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatconfigurableoptions3Inputs */

const en_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`configurable options`)
};

const es_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`opciones configurables`)
};

const zh_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可配置选项`)
};

/**
* | output |
* | --- |
* | "configurable options" |
*
* @param {Mcpstatconfigurableoptions3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpstatconfigurableoptions3 = /** @type {((inputs?: Mcpstatconfigurableoptions3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatconfigurableoptions3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpstatconfigurableoptions3(inputs)
	if (locale === "es") return es_mcpstatconfigurableoptions3(inputs)
	return zh_mcpstatconfigurableoptions3(inputs)
});
export { mcpstatconfigurableoptions3 as "mcpStatConfigurableOptions" }