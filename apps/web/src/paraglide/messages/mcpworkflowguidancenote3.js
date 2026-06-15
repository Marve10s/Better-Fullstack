/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowguidancenote3Inputs */

const en_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`workflow rules + field semantics`)
};

const es_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`reglas de flujo + semántica de campos`)
};

const zh_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作流规则 + 字段语义`)
};

/**
* | output |
* | --- |
* | "workflow rules + field semantics" |
*
* @param {Mcpworkflowguidancenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowguidancenote3 = /** @type {((inputs?: Mcpworkflowguidancenote3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowguidancenote3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowguidancenote3(inputs)
	if (locale === "es") return es_mcpworkflowguidancenote3(inputs)
	return zh_mcpworkflowguidancenote3(inputs)
});
export { mcpworkflowguidancenote3 as "mcpWorkflowGuidanceNote" }