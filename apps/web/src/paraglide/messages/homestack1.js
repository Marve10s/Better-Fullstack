/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestack1Inputs */

const en_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack.`)
};

const es_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack.`)
};

const zh_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack。`)
};

/**
* | output |
* | --- |
* | "stack." |
*
* @param {Homestack1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homestack1 = /** @type {((inputs?: Homestack1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestack1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homestack1(inputs)
	if (locale === "es") return es_homestack1(inputs)
	return zh_homestack1(inputs)
});
export { homestack1 as "homeStack" }