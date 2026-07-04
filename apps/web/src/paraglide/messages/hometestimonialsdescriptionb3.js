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

const ja_hometestimonialsdescriptionb3 = /** @type {(inputs: Hometestimonialsdescriptionb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`そして`)
};

const ko_hometestimonialsdescriptionb3 = /** @type {(inputs: Hometestimonialsdescriptionb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`그리고`)
};

const zh_hant1_hometestimonialsdescriptionb3 = /** @type {(inputs: Hometestimonialsdescriptionb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`和`)
};

const de_hometestimonialsdescriptionb3 = /** @type {(inputs: Hometestimonialsdescriptionb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Und`)
};

const fr_hometestimonialsdescriptionb3 = /** @type {(inputs: Hometestimonialsdescriptionb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`et`)
};

/**
* | output |
* | --- |
* | "and" |
*
* @param {Hometestimonialsdescriptionb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometestimonialsdescriptionb3 = /** @type {((inputs?: Hometestimonialsdescriptionb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialsdescriptionb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialsdescriptionb3(inputs)
	if (locale === "es") return es_hometestimonialsdescriptionb3(inputs)
	if (locale === "zh") return zh_hometestimonialsdescriptionb3(inputs)
	if (locale === "ja") return ja_hometestimonialsdescriptionb3(inputs)
	if (locale === "ko") return ko_hometestimonialsdescriptionb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometestimonialsdescriptionb3(inputs)
	if (locale === "de") return de_hometestimonialsdescriptionb3(inputs)
	return fr_hometestimonialsdescriptionb3(inputs)
});
export { hometestimonialsdescriptionb3 as "homeTestimonialsDescriptionB" }