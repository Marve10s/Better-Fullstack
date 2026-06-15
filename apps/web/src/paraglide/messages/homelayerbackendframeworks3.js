/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerbackendframeworks3Inputs */

const en_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BACKEND FRAMEWORKS`)
};

const es_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FRAMEWORKS BACKEND`)
};

const zh_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`后端框架`)
};

/**
* | output |
* | --- |
* | "BACKEND FRAMEWORKS" |
*
* @param {Homelayerbackendframeworks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homelayerbackendframeworks3 = /** @type {((inputs?: Homelayerbackendframeworks3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerbackendframeworks3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerbackendframeworks3(inputs)
	if (locale === "es") return es_homelayerbackendframeworks3(inputs)
	return zh_homelayerbackendframeworks3(inputs)
});
export { homelayerbackendframeworks3 as "homeLayerBackendFrameworks" }