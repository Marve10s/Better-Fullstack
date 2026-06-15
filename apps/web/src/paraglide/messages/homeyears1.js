/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeyears1Inputs */

const en_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`years`)
};

const es_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`años`)
};

const zh_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`年`)
};

/**
* | output |
* | --- |
* | "years" |
*
* @param {Homeyears1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homeyears1 = /** @type {((inputs?: Homeyears1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeyears1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeyears1(inputs)
	if (locale === "es") return es_homeyears1(inputs)
	return zh_homeyears1(inputs)
});
export { homeyears1 as "homeYears" }