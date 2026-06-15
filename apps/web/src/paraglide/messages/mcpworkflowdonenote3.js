/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowdonenote3Inputs */

const en_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`run bun install to finish`)
};

const es_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ejecuta bun install para terminar`)
};

const zh_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行 bun install 完成安装`)
};

/**
* | output |
* | --- |
* | "run bun install to finish" |
*
* @param {Mcpworkflowdonenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowdonenote3 = /** @type {((inputs?: Mcpworkflowdonenote3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowdonenote3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowdonenote3(inputs)
	if (locale === "es") return es_mcpworkflowdonenote3(inputs)
	return zh_mcpworkflowdonenote3(inputs)
});
export { mcpworkflowdonenote3 as "mcpWorkflowDoneNote" }