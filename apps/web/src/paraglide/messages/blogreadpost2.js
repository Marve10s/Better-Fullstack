/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogreadpost2Inputs */



/**
* | output |
* | --- |
* | "Read post" |
*
* @param {Blogreadpost2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogreadpost2 = /** @type {((inputs?: Blogreadpost2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogreadpost2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Leer publicación")
	if (locale === "zh") return /** @type {LocalizedString} */ ("阅读文章")
	if (locale === "ja") return /** @type {LocalizedString} */ ("記事を読む")
	if (locale === "ko") return /** @type {LocalizedString} */ ("글 읽기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("閱讀文章")
	if (locale === "de") return /** @type {LocalizedString} */ ("Beitrag lesen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Lire l'article")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Читати допис")
	return /** @type {LocalizedString} */ ("Read post")
});
export { blogreadpost2 as "blogReadPost" }