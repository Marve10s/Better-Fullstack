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

const ja_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`これで出荷した人々によるものです。`)
};

const ko_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 도구로 출시한 사람들이 남긴 글입니다.`)
};

const zh_hant1_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`來自真正用它發貨的人。`)
};

const de_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`von Leuten, die damit ausgeliefert haben.`)
};

const fr_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`par des personnes qui l'ont utilisé pour livrer.`)
};

const uk_hometestimonialsdescriptionc3 = /** @type {(inputs: Hometestimonialsdescriptionc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`від людей, які вже шипили з ним.`)
};

/**
* | output |
* | --- |
* | "by people who shipped with it." |
*
* @param {Hometestimonialsdescriptionc3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const hometestimonialsdescriptionc3 = /** @type {((inputs?: Hometestimonialsdescriptionc3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialsdescriptionc3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_hometestimonialsdescriptionc3(inputs)
	if (locale === "zh") return zh_hometestimonialsdescriptionc3(inputs)
	if (locale === "ja") return ja_hometestimonialsdescriptionc3(inputs)
	if (locale === "ko") return ko_hometestimonialsdescriptionc3(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometestimonialsdescriptionc3(inputs)
	if (locale === "de") return de_hometestimonialsdescriptionc3(inputs)
	if (locale === "fr") return fr_hometestimonialsdescriptionc3(inputs)
	if (locale === "uk") return uk_hometestimonialsdescriptionc3(inputs)
	return en_hometestimonialsdescriptionc3(inputs)
});
export { hometestimonialsdescriptionc3 as "homeTestimonialsDescriptionC" }