/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowschemanote3Inputs */

const en_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`valid options for the stack`)
};

const es_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`opciones válidas para el stack`)
};

const zh_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此 stack 的有效选项`)
};

/**
* | output |
* | --- |
* | "valid options for the stack" |
*
* @param {Mcpworkflowschemanote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowschemanote3 = /** @type {((inputs?: Mcpworkflowschemanote3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowschemanote3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowschemanote3(inputs)
	if (locale === "es") return es_mcpworkflowschemanote3(inputs)
	return zh_mcpworkflowschemanote3(inputs)
});
export { mcpworkflowschemanote3 as "mcpWorkflowSchemaNote" }