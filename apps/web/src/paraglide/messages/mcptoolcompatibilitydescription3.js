/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolcompatibilitydescription3Inputs */

const en_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validate stack combinations with auto-adjustments`)
};

const es_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valida combinaciones de stack con autoajustes`)
};

const zh_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证 stack 组合并自动调整`)
};

/**
* | output |
* | --- |
* | "Validate stack combinations with auto-adjustments" |
*
* @param {Mcptoolcompatibilitydescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolcompatibilitydescription3 = /** @type {((inputs?: Mcptoolcompatibilitydescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolcompatibilitydescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolcompatibilitydescription3(inputs)
	if (locale === "es") return es_mcptoolcompatibilitydescription3(inputs)
	return zh_mcptoolcompatibilitydescription3(inputs)
});
export { mcptoolcompatibilitydescription3 as "mcpToolCompatibilityDescription" }