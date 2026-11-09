/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogfontlabel2Inputs */



/**
* | output |
* | --- |
* | "Reading typeface" |
*
* @param {Blogfontlabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogfontlabel2 = /** @type {((inputs?: Blogfontlabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogfontlabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Tipografía de lectura")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正文字体")
	if (locale === "ja") return /** @type {LocalizedString} */ ("本文フォント")
	if (locale === "ko") return /** @type {LocalizedString} */ ("본문 글꼴")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("內文字體")
	if (locale === "de") return /** @type {LocalizedString} */ ("Leseschriftart")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Police de lecture")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шрифт для читання")
	return /** @type {LocalizedString} */ ("Reading typeface")
});
export { blogfontlabel2 as "blogFontLabel" }