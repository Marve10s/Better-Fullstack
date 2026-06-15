/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialstitlea3Inputs */

const en_hometestimonialstitlea3 = /** @type {(inputs: Hometestimonialstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`People`)
};

const es_hometestimonialstitlea3 = /** @type {(inputs: Hometestimonialstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La gente`)
};

const zh_hometestimonialstitlea3 = /** @type {(inputs: Hometestimonialstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`大家`)
};

/**
* | output |
* | --- |
* | "People" |
*
* @param {Hometestimonialstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometestimonialstitlea3 = /** @type {((inputs?: Hometestimonialstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialstitlea3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialstitlea3(inputs)
	if (locale === "es") return es_hometestimonialstitlea3(inputs)
	return zh_hometestimonialstitlea3(inputs)
});
export { hometestimonialstitlea3 as "homeTestimonialsTitleA" }