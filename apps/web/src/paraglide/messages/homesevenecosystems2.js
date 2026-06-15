/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homesevenecosystems2Inputs */

const en_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`seven ecosystems`)
};

const es_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`siete ecosistemas`)
};

const zh_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七个生态`)
};

/**
* | output |
* | --- |
* | "seven ecosystems" |
*
* @param {Homesevenecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homesevenecosystems2 = /** @type {((inputs?: Homesevenecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homesevenecosystems2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homesevenecosystems2(inputs)
	if (locale === "es") return es_homesevenecosystems2(inputs)
	return zh_homesevenecosystems2(inputs)
});
export { homesevenecosystems2 as "homeSevenEcosystems" }