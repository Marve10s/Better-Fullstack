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

const ja_hometestimonialstitlea3 = /** @type {(inputs: Hometestimonialstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`人々`)
};

const ko_hometestimonialstitlea3 = /** @type {(inputs: Hometestimonialstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사람들`)
};

const zh_hant1_hometestimonialstitlea3 = /** @type {(inputs: Hometestimonialstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`大家`)
};

const de_hometestimonialstitlea3 = /** @type {(inputs: Hometestimonialstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menschen`)
};

const fr_hometestimonialstitlea3 = /** @type {(inputs: Hometestimonialstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Personnes`)
};

/**
* | output |
* | --- |
* | "People" |
*
* @param {Hometestimonialstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometestimonialstitlea3 = /** @type {((inputs?: Hometestimonialstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialstitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialstitlea3(inputs)
	if (locale === "es") return es_hometestimonialstitlea3(inputs)
	if (locale === "zh") return zh_hometestimonialstitlea3(inputs)
	if (locale === "ja") return ja_hometestimonialstitlea3(inputs)
	if (locale === "ko") return ko_hometestimonialstitlea3(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometestimonialstitlea3(inputs)
	if (locale === "de") return de_hometestimonialstitlea3(inputs)
	return fr_hometestimonialstitlea3(inputs)
});
export { hometestimonialstitlea3 as "homeTestimonialsTitleA" }