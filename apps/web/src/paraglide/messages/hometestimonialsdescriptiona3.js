/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialsdescriptiona3Inputs */

const en_hometestimonialsdescriptiona3 = /** @type {(inputs: Hometestimonialsdescriptiona3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Posted on`)
};

const es_hometestimonialsdescriptiona3 = /** @type {(inputs: Hometestimonialsdescriptiona3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Publicado en`)
};

const zh_hometestimonialsdescriptiona3 = /** @type {(inputs: Hometestimonialsdescriptiona3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发布在`)
};

/**
* | output |
* | --- |
* | "Posted on" |
*
* @param {Hometestimonialsdescriptiona3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometestimonialsdescriptiona3 = /** @type {((inputs?: Hometestimonialsdescriptiona3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialsdescriptiona3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialsdescriptiona3(inputs)
	if (locale === "es") return es_hometestimonialsdescriptiona3(inputs)
	return zh_hometestimonialsdescriptiona3(inputs)
});
export { hometestimonialsdescriptiona3 as "homeTestimonialsDescriptionA" }