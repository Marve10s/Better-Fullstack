/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialstitleb3Inputs */



/**
* | output |
* | --- |
* | "almost" |
*
* @param {Hometestimonialstitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const hometestimonialstitleb3 = /** @type {((inputs?: Hometestimonialstitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialstitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("casi")
	if (locale === "zh") return /** @type {LocalizedString} */ ("差一点")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ほとんど")
	if (locale === "ko") return /** @type {LocalizedString} */ ("거의")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("差一點")
	if (locale === "de") return /** @type {LocalizedString} */ ("fast")
	if (locale === "fr") return /** @type {LocalizedString} */ ("presque")
	if (locale === "uk") return /** @type {LocalizedString} */ ("майже")
	return /** @type {LocalizedString} */ ("almost")
});
export { hometestimonialstitleb3 as "homeTestimonialsTitleB" }