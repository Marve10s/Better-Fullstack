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

const ja_hometestimonialstitlec3 = /** @type {(inputs: Hometestimonialstitlec3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`大好きです。`)
};

const ko_hometestimonialstitlec3 = /** @type {(inputs: Hometestimonialstitlec3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`정말 좋아해요.`)
};

const zh_hant1_hometestimonialstitlec3 = /** @type {(inputs: Hometestimonialstitlec3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`就愛上它。`)
};

const de_hometestimonialstitlec3 = /** @type {(inputs: Hometestimonialstitlec3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ich liebe es.`)
};

const fr_hometestimonialstitlec3 = /** @type {(inputs: Hometestimonialstitlec3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`aimer.`)
};

/**
* | output |
* | --- |
* | "love it." |
*
* @param {Hometestimonialstitlec3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometestimonialstitlec3 = /** @type {((inputs?: Hometestimonialstitlec3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialstitlec3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialstitlec3(inputs)
	if (locale === "es") return es_hometestimonialstitlec3(inputs)
	if (locale === "zh") return zh_hometestimonialstitlec3(inputs)
	if (locale === "ja") return ja_hometestimonialstitlec3(inputs)
	if (locale === "ko") return ko_hometestimonialstitlec3(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometestimonialstitlec3(inputs)
	if (locale === "de") return de_hometestimonialstitlec3(inputs)
	return fr_hometestimonialstitlec3(inputs)
});
export { hometestimonialstitlec3 as "homeTestimonialsTitleC" }