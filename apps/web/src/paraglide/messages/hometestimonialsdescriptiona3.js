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

const ja_hometestimonialsdescriptiona3 = /** @type {(inputs: Hometestimonialsdescriptiona3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`投稿日`)
};

const ko_hometestimonialsdescriptiona3 = /** @type {(inputs: Hometestimonialsdescriptiona3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`게시 날짜`)
};

const zh_hant1_hometestimonialsdescriptiona3 = /** @type {(inputs: Hometestimonialsdescriptiona3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`發佈在`)
};

const de_hometestimonialsdescriptiona3 = /** @type {(inputs: Hometestimonialsdescriptiona3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gepostet am`)
};

const fr_hometestimonialsdescriptiona3 = /** @type {(inputs: Hometestimonialsdescriptiona3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Publié le`)
};

/**
* | output |
* | --- |
* | "Posted on" |
*
* @param {Hometestimonialsdescriptiona3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometestimonialsdescriptiona3 = /** @type {((inputs?: Hometestimonialsdescriptiona3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialsdescriptiona3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialsdescriptiona3(inputs)
	if (locale === "es") return es_hometestimonialsdescriptiona3(inputs)
	if (locale === "zh") return zh_hometestimonialsdescriptiona3(inputs)
	if (locale === "ja") return ja_hometestimonialsdescriptiona3(inputs)
	if (locale === "ko") return ko_hometestimonialsdescriptiona3(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometestimonialsdescriptiona3(inputs)
	if (locale === "de") return de_hometestimonialsdescriptiona3(inputs)
	return fr_hometestimonialsdescriptiona3(inputs)
});
export { hometestimonialsdescriptiona3 as "homeTestimonialsDescriptionA" }