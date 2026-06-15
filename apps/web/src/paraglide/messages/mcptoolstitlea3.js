/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolstitlea3Inputs */

const en_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Seven tools.`)
};

const es_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Siete herramientas.`)
};

const zh_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七个工具。`)
};

/**
* | output |
* | --- |
* | "Seven tools." |
*
* @param {Mcptoolstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolstitlea3 = /** @type {((inputs?: Mcptoolstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolstitlea3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolstitlea3(inputs)
	if (locale === "es") return es_mcptoolstitlea3(inputs)
	return zh_mcptoolstitlea3(inputs)
});
export { mcptoolstitlea3 as "mcpToolsTitleA" }