/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkfloweyebrow2Inputs */

const en_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`workflow`)
};

const es_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`flujo`)
};

const zh_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`流程`)
};

/**
* | output |
* | --- |
* | "workflow" |
*
* @param {Mcpworkfloweyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkfloweyebrow2 = /** @type {((inputs?: Mcpworkfloweyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkfloweyebrow2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkfloweyebrow2(inputs)
	if (locale === "es") return es_mcpworkfloweyebrow2(inputs)
	return zh_mcpworkfloweyebrow2(inputs)
});
export { mcpworkfloweyebrow2 as "mcpWorkflowEyebrow" }