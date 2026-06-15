/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowcompatibilitynote3Inputs */

const en_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack validated, 0 adjustments`)
};

const es_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack validado, 0 ajustes`)
};

const zh_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack 已验证，0 项调整`)
};

/**
* | output |
* | --- |
* | "stack validated, 0 adjustments" |
*
* @param {Mcpworkflowcompatibilitynote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowcompatibilitynote3 = /** @type {((inputs?: Mcpworkflowcompatibilitynote3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowcompatibilitynote3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowcompatibilitynote3(inputs)
	if (locale === "es") return es_mcpworkflowcompatibilitynote3(inputs)
	return zh_mcpworkflowcompatibilitynote3(inputs)
});
export { mcpworkflowcompatibilitynote3 as "mcpWorkflowCompatibilityNote" }