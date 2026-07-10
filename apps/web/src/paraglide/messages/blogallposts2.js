/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogallposts2Inputs */

const en_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All posts`)
};

const es_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Todas las publicaciones`)
};

const zh_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部文章`)
};

const ja_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべての記事`)
};

const ko_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 글`)
};

const zh_hant1_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部文章`)
};

const de_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alle Beiträge`)
};

const fr_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tous les articles`)
};

const uk_blogallposts2 = /** @type {(inputs: Blogallposts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Усі дописи`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogallposts2(inputs)
	if (locale === "es") return es_blogallposts2(inputs)
	if (locale === "zh") return zh_blogallposts2(inputs)
	if (locale === "ja") return ja_blogallposts2(inputs)
	if (locale === "ko") return ko_blogallposts2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogallposts2(inputs)
	if (locale === "de") return de_blogallposts2(inputs)
	if (locale === "fr") return fr_blogallposts2(inputs)
	return uk_blogallposts2(inputs)
});
export { blogallposts2 as "blogAllPosts" }