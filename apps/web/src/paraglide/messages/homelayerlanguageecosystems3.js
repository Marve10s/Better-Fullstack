/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerlanguageecosystems3Inputs */

const en_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LANGUAGE ECOSYSTEMS`)
};

const es_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ECOSISTEMAS DE LENGUAJE`)
};

const zh_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`语言生态`)
};

/**
* | output |
* | --- |
* | "LANGUAGE ECOSYSTEMS" |
*
* @param {Homelayerlanguageecosystems3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homelayerlanguageecosystems3 = /** @type {((inputs?: Homelayerlanguageecosystems3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerlanguageecosystems3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerlanguageecosystems3(inputs)
	if (locale === "es") return es_homelayerlanguageecosystems3(inputs)
	return zh_homelayerlanguageecosystems3(inputs)
});
export { homelayerlanguageecosystems3 as "homeLayerLanguageEcosystems" }