/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogfontlabel2Inputs */

const en_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reading typeface`)
};

const es_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tipografía de lectura`)
};

const zh_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正文字体`)
};

const ja_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本文フォント`)
};

const ko_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`본문 글꼴`)
};

const zh_hant1_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`內文字體`)
};

const de_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leseschriftart`)
};

const fr_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Police de lecture`)
};

const uk_blogfontlabel2 = /** @type {(inputs: Blogfontlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шрифт для читання`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogfontlabel2(inputs)
	if (locale === "es") return es_blogfontlabel2(inputs)
	if (locale === "zh") return zh_blogfontlabel2(inputs)
	if (locale === "ja") return ja_blogfontlabel2(inputs)
	if (locale === "ko") return ko_blogfontlabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogfontlabel2(inputs)
	if (locale === "de") return de_blogfontlabel2(inputs)
	if (locale === "fr") return fr_blogfontlabel2(inputs)
	return uk_blogfontlabel2(inputs)
});
export { blogfontlabel2 as "blogFontLabel" }