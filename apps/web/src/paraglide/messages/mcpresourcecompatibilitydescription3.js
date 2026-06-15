/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourcecompatibilitydescription3Inputs */

const en_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Which stack combinations are valid`)
};

const es_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Qué combinaciones de stack son válidas`)
};

const zh_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`哪些 stack 组合有效`)
};

/**
* | output |
* | --- |
* | "Which stack combinations are valid" |
*
* @param {Mcpresourcecompatibilitydescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpresourcecompatibilitydescription3 = /** @type {((inputs?: Mcpresourcecompatibilitydescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresourcecompatibilitydescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpresourcecompatibilitydescription3(inputs)
	if (locale === "es") return es_mcpresourcecompatibilitydescription3(inputs)
	return zh_mcpresourcecompatibilitydescription3(inputs)
});
export { mcpresourcecompatibilitydescription3 as "mcpResourceCompatibilityDescription" }