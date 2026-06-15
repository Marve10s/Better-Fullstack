/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpherotitleb3Inputs */

const en_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every stack.`)
};

const es_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada stack.`)
};

const zh_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任何 stack。`)
};

/**
* | output |
* | --- |
* | "Every stack." |
*
* @param {Mcpherotitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpherotitleb3 = /** @type {((inputs?: Mcpherotitleb3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpherotitleb3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpherotitleb3(inputs)
	if (locale === "es") return es_mcpherotitleb3(inputs)
	return zh_mcpherotitleb3(inputs)
});
export { mcpherotitleb3 as "mcpHeroTitleB" }