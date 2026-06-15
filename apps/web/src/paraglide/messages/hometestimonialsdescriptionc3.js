/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialsdescriptionc3Inputs */

const en_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`by people who shipped with it.`)
};

const es_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`por personas que construyeron con él.`)
};

const zh_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来自真正用它发货的人。`)
};

/**
* | output |
* | --- |
* | "by people who shipped with it." |
*
* @param {Hometestimonialsdescriptionc3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometestimonialsdescriptionc3 = /** @type {((inputs?: Hometestimonialsdescriptionc3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialsdescriptionc3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialsdescriptionc3(inputs)
	if (locale === "es") return es_hometestimonialsdescriptionc3(inputs)
	return zh_hometestimonialsdescriptionc3(inputs)
});
export { hometestimonialsdescriptionc3 as "homeTestimonialsDescriptionC" }