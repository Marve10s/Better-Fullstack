/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Bloglatestpost2Inputs */

const en_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Latest post`)
};

const es_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Última publicación`)
};

const zh_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新文章`)
};

const ja_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新記事`)
};

const ko_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 글`)
};

const zh_hant1_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新文章`)
};

const de_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neuester Beitrag`)
};

const fr_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dernier article`)
};

const uk_bloglatestpost2 = /** @type {(inputs: Bloglatestpost2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Останній допис`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_bloglatestpost2(inputs)
	if (locale === "es") return es_bloglatestpost2(inputs)
	if (locale === "zh") return zh_bloglatestpost2(inputs)
	if (locale === "ja") return ja_bloglatestpost2(inputs)
	if (locale === "ko") return ko_bloglatestpost2(inputs)
	if (locale === "zh-Hant") return zh_hant1_bloglatestpost2(inputs)
	if (locale === "de") return de_bloglatestpost2(inputs)
	if (locale === "fr") return fr_bloglatestpost2(inputs)
	return uk_bloglatestpost2(inputs)
});
export { bloglatestpost2 as "blogLatestPost" }