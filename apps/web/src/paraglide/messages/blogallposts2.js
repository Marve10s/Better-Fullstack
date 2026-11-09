/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogallposts2Inputs */



/**
* | output |
* | --- |
* | "All posts" |
*
* @param {Blogallposts2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogallposts2 = /** @type {((inputs?: Blogallposts2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogallposts2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Todas las publicaciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("全部文章")
	if (locale === "ja") return /** @type {LocalizedString} */ ("すべての記事")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모든 글")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("全部文章")
	if (locale === "de") return /** @type {LocalizedString} */ ("Alle Beiträge")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Tous les articles")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Усі дописи")
	return /** @type {LocalizedString} */ ("All posts")
});
export { blogallposts2 as "blogAllPosts" }