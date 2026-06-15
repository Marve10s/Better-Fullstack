/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupecosystems2Inputs */

const en_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosystems`)
};

const es_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosistemas`)
};

const zh_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生态`)
};

/**
* | output |
* | --- |
* | "Ecosystems" |
*
* @param {Comparegroupecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparegroupecosystems2 = /** @type {((inputs?: Comparegroupecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupecosystems2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupecosystems2(inputs)
	if (locale === "es") return es_comparegroupecosystems2(inputs)
	return zh_comparegroupecosystems2(inputs)
});
export { comparegroupecosystems2 as "compareGroupEcosystems" }