/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialstitlec3Inputs */



/**
* | output |
* | --- |
* | "love it." |
*
* @param {Hometestimonialstitlec3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const hometestimonialstitlec3 = /** @type {((inputs?: Hometestimonialstitlec3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialstitlec3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("lo ama.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("就爱上它。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("大好きです。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("정말 좋아해요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("就愛上它。")
	if (locale === "de") return /** @type {LocalizedString} */ ("lieben es.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("l'adorent.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("закохані.")
	return /** @type {LocalizedString} */ ("love it.")
});
export { hometestimonialstitlec3 as "homeTestimonialsTitleC" }