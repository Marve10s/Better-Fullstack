/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparepwasupport2Inputs */

const en_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PWA support`)
};

const es_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Soporte PWA`)
};

const zh_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PWA 支持`)
};

/**
* | output |
* | --- |
* | "PWA support" |
*
* @param {Comparepwasupport2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparepwasupport2 = /** @type {((inputs?: Comparepwasupport2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepwasupport2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparepwasupport2(inputs)
	if (locale === "es") return es_comparepwasupport2(inputs)
	return zh_comparepwasupport2(inputs)
});
export { comparepwasupport2 as "comparePwaSupport" }