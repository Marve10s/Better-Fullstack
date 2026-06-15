/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourceoptionsdescription3Inputs */

const en_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All technology options per category`)
};

const es_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Todas las opciones tecnológicas por categoría`)
};

const zh_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个类别的所有技术选项`)
};

/**
* | output |
* | --- |
* | "All technology options per category" |
*
* @param {Mcpresourceoptionsdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpresourceoptionsdescription3 = /** @type {((inputs?: Mcpresourceoptionsdescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresourceoptionsdescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpresourceoptionsdescription3(inputs)
	if (locale === "es") return es_mcpresourceoptionsdescription3(inputs)
	return zh_mcpresourceoptionsdescription3(inputs)
});
export { mcpresourceoptionsdescription3 as "mcpResourceOptionsDescription" }