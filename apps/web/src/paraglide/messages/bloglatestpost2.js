/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Bloglatestpost2Inputs */



/**
* | output |
* | --- |
* | "Latest post" |
*
* @param {Bloglatestpost2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const bloglatestpost2 = /** @type {((inputs?: Bloglatestpost2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bloglatestpost2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Última publicación")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新文章")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新記事")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 글")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新文章")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neuester Beitrag")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dernier article")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останній допис")
	return /** @type {LocalizedString} */ ("Latest post")
});
export { bloglatestpost2 as "blogLatestPost" }