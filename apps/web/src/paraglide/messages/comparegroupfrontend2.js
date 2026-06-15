/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupfrontend2Inputs */

const en_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend`)
};

const es_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend`)
};

const zh_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前端`)
};

/**
* | output |
* | --- |
* | "Frontend" |
*
* @param {Comparegroupfrontend2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparegroupfrontend2 = /** @type {((inputs?: Comparegroupfrontend2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupfrontend2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupfrontend2(inputs)
	if (locale === "es") return es_comparegroupfrontend2(inputs)
	return zh_comparegroupfrontend2(inputs)
});
export { comparegroupfrontend2 as "compareGroupFrontend" }