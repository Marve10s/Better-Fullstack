/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialstitlec3Inputs */

const en_hometestimonialstitlec3 = /** @type {(inputs: Hometestimonialstitlec3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`love it.`)
};

const es_hometestimonialstitlec3 = /** @type {(inputs: Hometestimonialstitlec3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`lo ama.`)
};

const zh_hometestimonialstitlec3 = /** @type {(inputs: Hometestimonialstitlec3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`就爱上它。`)
};

/**
* | output |
* | --- |
* | "love it." |
*
* @param {Hometestimonialstitlec3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometestimonialstitlec3 = /** @type {((inputs?: Hometestimonialstitlec3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialstitlec3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialstitlec3(inputs)
	if (locale === "es") return es_hometestimonialstitlec3(inputs)
	return zh_hometestimonialstitlec3(inputs)
});
export { hometestimonialstitlec3 as "homeTestimonialsTitleC" }