/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolguidancedescription3Inputs */

const en_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workflow rules, field semantics, and critical constraints`)
};

const es_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reglas de flujo, semántica de campos y restricciones críticas`)
};

const zh_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作流规则、字段语义和关键约束`)
};

/**
* | output |
* | --- |
* | "Workflow rules, field semantics, and critical constraints" |
*
* @param {Mcptoolguidancedescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolguidancedescription3 = /** @type {((inputs?: Mcptoolguidancedescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolguidancedescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolguidancedescription3(inputs)
	if (locale === "es") return es_mcptoolguidancedescription3(inputs)
	return zh_mcptoolguidancedescription3(inputs)
});
export { mcptoolguidancedescription3 as "mcpToolGuidanceDescription" }