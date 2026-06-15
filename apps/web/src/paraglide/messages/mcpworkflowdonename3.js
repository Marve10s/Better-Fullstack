/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowdonename3Inputs */

const en_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`scaffold complete`)
};

const es_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`scaffold completado`)
};

const zh_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`scaffold 完成`)
};

/**
* | output |
* | --- |
* | "scaffold complete" |
*
* @param {Mcpworkflowdonename3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowdonename3 = /** @type {((inputs?: Mcpworkflowdonename3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowdonename3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowdonename3(inputs)
	if (locale === "es") return es_mcpworkflowdonename3(inputs)
	return zh_mcpworkflowdonename3(inputs)
});
export { mcpworkflowdonename3 as "mcpWorkflowDoneName" }