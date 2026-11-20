/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogreadinglengthlabel3Inputs */



/**
* | output |
* | --- |
* | "Article length" |
*
* @param {Blogreadinglengthlabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogreadinglengthlabel3 = /** @type {((inputs?: Blogreadinglengthlabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogreadinglengthlabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Longitud del artículo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("文章长度")
	if (locale === "ja") return /** @type {LocalizedString} */ ("記事の長さ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("글 길이")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("文章長度")
	if (locale === "de") return /** @type {LocalizedString} */ ("Artikellänge")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Longueur de l'article")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Довжина статті")
	return /** @type {LocalizedString} */ ("Article length")
});
export { blogreadinglengthlabel3 as "blogReadingLengthLabel" }