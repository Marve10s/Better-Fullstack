/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatstructuredtools3Inputs */

const en_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`structured tools`)
};

const es_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`herramientas estructuradas`)
};

const zh_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结构化工具`)
};

/**
* | output |
* | --- |
* | "structured tools" |
*
* @param {Mcpstatstructuredtools3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpstatstructuredtools3 = /** @type {((inputs?: Mcpstatstructuredtools3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatstructuredtools3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpstatstructuredtools3(inputs)
	if (locale === "es") return es_mcpstatstructuredtools3(inputs)
	return zh_mcpstatstructuredtools3(inputs)
});
export { mcpstatstructuredtools3 as "mcpStatStructuredTools" }