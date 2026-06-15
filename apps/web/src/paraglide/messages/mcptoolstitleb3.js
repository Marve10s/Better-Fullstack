/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolstitleb3Inputs */

const en_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One workflow.`)
};

const es_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un flujo.`)
};

const zh_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一个流程。`)
};

/**
* | output |
* | --- |
* | "One workflow." |
*
* @param {Mcptoolstitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolstitleb3 = /** @type {((inputs?: Mcptoolstitleb3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolstitleb3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolstitleb3(inputs)
	if (locale === "es") return es_mcptoolstitleb3(inputs)
	return zh_mcptoolstitleb3(inputs)
});
export { mcptoolstitleb3 as "mcpToolsTitleB" }