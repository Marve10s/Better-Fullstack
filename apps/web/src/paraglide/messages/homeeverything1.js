/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeeverything1Inputs */

const en_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Everything.`)
};

const es_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Todo.`)
};

const zh_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全都支持。`)
};

/**
* | output |
* | --- |
* | "Everything." |
*
* @param {Homeeverything1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homeeverything1 = /** @type {((inputs?: Homeeverything1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeeverything1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeeverything1(inputs)
	if (locale === "es") return es_homeeverything1(inputs)
	return zh_homeeverything1(inputs)
});
export { homeeverything1 as "homeEverything" }