/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowplannote3Inputs */

const en_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`dry-run preview, 59 files`)
};

const es_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`vista previa dry-run, 59 archivos`)
};

const zh_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`dry-run 预览，59 个文件`)
};

/**
* | output |
* | --- |
* | "dry-run preview, 59 files" |
*
* @param {Mcpworkflowplannote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowplannote3 = /** @type {((inputs?: Mcpworkflowplannote3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowplannote3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowplannote3(inputs)
	if (locale === "es") return es_mcpworkflowplannote3(inputs)
	return zh_mcpworkflowplannote3(inputs)
});
export { mcpworkflowplannote3 as "mcpWorkflowPlanNote" }