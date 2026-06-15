/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homepossibilities1Inputs */

const en_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`possibilities.`)
};

const es_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`infinitas.`)
};

const zh_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可能性。`)
};

/**
* | output |
* | --- |
* | "possibilities." |
*
* @param {Homepossibilities1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homepossibilities1 = /** @type {((inputs?: Homepossibilities1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homepossibilities1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homepossibilities1(inputs)
	if (locale === "es") return es_homepossibilities1(inputs)
	return zh_homepossibilities1(inputs)
});
export { homepossibilities1 as "homePossibilities" }