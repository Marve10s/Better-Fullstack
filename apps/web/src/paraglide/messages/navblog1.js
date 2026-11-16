/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navblog1Inputs */



/**
* | output |
* | --- |
* | "Blog" |
*
* @param {Navblog1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navblog1 = /** @type {((inputs?: Navblog1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navblog1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Blog")
	if (locale === "zh") return /** @type {LocalizedString} */ ("博客")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブログ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("블로그")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("部落格")
	if (locale === "de") return /** @type {LocalizedString} */ ("Blog")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Blog")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Блог")
	return /** @type {LocalizedString} */ ("Blog")
});
export { navblog1 as "navBlog" }