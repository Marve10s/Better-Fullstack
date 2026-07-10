/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogreadinglengthlabel3Inputs */

const en_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Article length`)
};

const es_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Longitud del artículo`)
};

const zh_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文章长度`)
};

const ja_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`記事の長さ`)
};

const ko_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`글 길이`)
};

const zh_hant1_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文章長度`)
};

const de_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Artikellänge`)
};

const fr_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Longueur de l'article`)
};

const uk_blogreadinglengthlabel3 = /** @type {(inputs: Blogreadinglengthlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Довжина статті`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogreadinglengthlabel3(inputs)
	if (locale === "es") return es_blogreadinglengthlabel3(inputs)
	if (locale === "zh") return zh_blogreadinglengthlabel3(inputs)
	if (locale === "ja") return ja_blogreadinglengthlabel3(inputs)
	if (locale === "ko") return ko_blogreadinglengthlabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogreadinglengthlabel3(inputs)
	if (locale === "de") return de_blogreadinglengthlabel3(inputs)
	if (locale === "fr") return fr_blogreadinglengthlabel3(inputs)
	return uk_blogreadinglengthlabel3(inputs)
});
export { blogreadinglengthlabel3 as "blogReadingLengthLabel" }