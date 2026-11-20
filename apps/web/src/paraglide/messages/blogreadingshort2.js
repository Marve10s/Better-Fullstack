/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogreadingshort2Inputs */



/**
* | output |
* | --- |
* | "Short" |
*
* @param {Blogreadingshort2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogreadingshort2 = /** @type {((inputs?: Blogreadingshort2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogreadingshort2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Corta")
	if (locale === "zh") return /** @type {LocalizedString} */ ("精简版")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ショート")
	if (locale === "ko") return /** @type {LocalizedString} */ ("짧게")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("精簡版")
	if (locale === "de") return /** @type {LocalizedString} */ ("Kurz")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Courte")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Коротка")
	return /** @type {LocalizedString} */ ("Short")
});
export { blogreadingshort2 as "blogReadingShort" }