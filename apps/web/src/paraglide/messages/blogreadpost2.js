/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogreadpost2Inputs */

const en_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read post`)
};

const es_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer publicación`)
};

const zh_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读文章`)
};

const ja_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`記事を読む`)
};

const ko_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`글 읽기`)
};

const zh_hant1_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閱讀文章`)
};

const de_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Beitrag lesen`)
};

const fr_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lire l'article`)
};

const uk_blogreadpost2 = /** @type {(inputs: Blogreadpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Читати допис`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogreadpost2(inputs)
	if (locale === "es") return es_blogreadpost2(inputs)
	if (locale === "zh") return zh_blogreadpost2(inputs)
	if (locale === "ja") return ja_blogreadpost2(inputs)
	if (locale === "ko") return ko_blogreadpost2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogreadpost2(inputs)
	if (locale === "de") return de_blogreadpost2(inputs)
	if (locale === "fr") return fr_blogreadpost2(inputs)
	return uk_blogreadpost2(inputs)
});
export { blogreadpost2 as "blogReadPost" }