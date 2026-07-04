/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialstitleb3Inputs */

const en_hometestimonialstitleb3 = /** @type {(inputs: Hometestimonialstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`almost`)
};

const es_hometestimonialstitleb3 = /** @type {(inputs: Hometestimonialstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`casi`)
};

const zh_hometestimonialstitleb3 = /** @type {(inputs: Hometestimonialstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`差一点`)
};

const ja_hometestimonialstitleb3 = /** @type {(inputs: Hometestimonialstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ほとんど`)
};

const ko_hometestimonialstitleb3 = /** @type {(inputs: Hometestimonialstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`거의`)
};

const zh_hant1_hometestimonialstitleb3 = /** @type {(inputs: Hometestimonialstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`差一點`)
};

const de_hometestimonialstitleb3 = /** @type {(inputs: Hometestimonialstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`fast`)
};

const fr_hometestimonialstitleb3 = /** @type {(inputs: Hometestimonialstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`presque`)
};

/**
* | output |
* | --- |
* | "almost" |
*
* @param {Hometestimonialstitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometestimonialstitleb3 = /** @type {((inputs?: Hometestimonialstitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialstitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialstitleb3(inputs)
	if (locale === "es") return es_hometestimonialstitleb3(inputs)
	if (locale === "zh") return zh_hometestimonialstitleb3(inputs)
	if (locale === "ja") return ja_hometestimonialstitleb3(inputs)
	if (locale === "ko") return ko_hometestimonialstitleb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometestimonialstitleb3(inputs)
	if (locale === "de") return de_hometestimonialstitleb3(inputs)
	return fr_hometestimonialstitleb3(inputs)
});
export { hometestimonialstitleb3 as "homeTestimonialsTitleB" }