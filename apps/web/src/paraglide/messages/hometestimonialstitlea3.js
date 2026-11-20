/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialstitlea3Inputs */



/**
* | output |
* | --- |
* | "People" |
*
* @param {Hometestimonialstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const hometestimonialstitlea3 = /** @type {((inputs?: Hometestimonialstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialstitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La gente")
	if (locale === "zh") return /** @type {LocalizedString} */ ("大家")
	if (locale === "ja") return /** @type {LocalizedString} */ ("人々")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사람들")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("大家")
	if (locale === "de") return /** @type {LocalizedString} */ ("Menschen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les gens")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Люди")
	return /** @type {LocalizedString} */ ("People")
});
export { hometestimonialstitlea3 as "homeTestimonialsTitleA" }