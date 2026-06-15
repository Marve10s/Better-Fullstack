/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowcreatenote3Inputs */

const en_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`written to ./my-app`)
};

const es_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`escrito en ./my-app`)
};

const zh_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已写入 ./my-app`)
};

/**
* | output |
* | --- |
* | "written to ./my-app" |
*
* @param {Mcpworkflowcreatenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowcreatenote3 = /** @type {((inputs?: Mcpworkflowcreatenote3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowcreatenote3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowcreatenote3(inputs)
	if (locale === "es") return es_mcpworkflowcreatenote3(inputs)
	return zh_mcpworkflowcreatenote3(inputs)
});
export { mcpworkflowcreatenote3 as "mcpWorkflowCreateNote" }