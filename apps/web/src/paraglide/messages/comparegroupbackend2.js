/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupbackend2Inputs */

const en_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const es_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const zh_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`后端`)
};

/**
* | output |
* | --- |
* | "Backend" |
*
* @param {Comparegroupbackend2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparegroupbackend2 = /** @type {((inputs?: Comparegroupbackend2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupbackend2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupbackend2(inputs)
	if (locale === "es") return es_comparegroupbackend2(inputs)
	return zh_comparegroupbackend2(inputs)
});
export { comparegroupbackend2 as "compareGroupBackend" }