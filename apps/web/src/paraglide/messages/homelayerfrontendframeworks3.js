/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerfrontendframeworks3Inputs */

const en_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FRONTEND FRAMEWORKS`)
};

const es_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FRAMEWORKS FRONTEND`)
};

const zh_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前端框架`)
};

/**
* | output |
* | --- |
* | "FRONTEND FRAMEWORKS" |
*
* @param {Homelayerfrontendframeworks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homelayerfrontendframeworks3 = /** @type {((inputs?: Homelayerfrontendframeworks3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerfrontendframeworks3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerfrontendframeworks3(inputs)
	if (locale === "es") return es_homelayerfrontendframeworks3(inputs)
	return zh_homelayerfrontendframeworks3(inputs)
});
export { homelayerfrontendframeworks3 as "homeLayerFrontendFrameworks" }