/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialsdescriptionb3Inputs */

const en_hometestimonialsdescriptionb3 = /** @type {(inputs: Hometestimonialsdescriptionb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`and`)
};

const es_hometestimonialsdescriptionb3 = /** @type {(inputs: Hometestimonialsdescriptionb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`y`)
};

const zh_hometestimonialsdescriptionb3 = /** @type {(inputs: Hometestimonialsdescriptionb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`和`)
};

/**
* | output |
* | --- |
* | "and" |
*
* @param {Hometestimonialsdescriptionb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometestimonialsdescriptionb3 = /** @type {((inputs?: Hometestimonialsdescriptionb3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialsdescriptionb3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialsdescriptionb3(inputs)
	if (locale === "es") return es_hometestimonialsdescriptionb3(inputs)
	return zh_hometestimonialsdescriptionb3(inputs)
});
export { hometestimonialsdescriptionb3 as "homeTestimonialsDescriptionB" }