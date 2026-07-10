/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogfontdefault2Inputs */

const en_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default`)
};

const es_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Predeterminada`)
};

const zh_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认`)
};

const ja_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`標準`)
};

const ko_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기본`)
};

const zh_hant1_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設`)
};

const de_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Standard`)
};

const fr_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Par défaut`)
};

const uk_blogfontdefault2 = /** @type {(inputs: Blogfontdefault2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Стандартний`)
};

/**
* | output |
* | --- |
* | "Default" |
*
* @param {Blogfontdefault2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogfontdefault2 = /** @type {((inputs?: Blogfontdefault2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogfontdefault2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogfontdefault2(inputs)
	if (locale === "es") return es_blogfontdefault2(inputs)
	if (locale === "zh") return zh_blogfontdefault2(inputs)
	if (locale === "ja") return ja_blogfontdefault2(inputs)
	if (locale === "ko") return ko_blogfontdefault2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogfontdefault2(inputs)
	if (locale === "de") return de_blogfontdefault2(inputs)
	if (locale === "fr") return fr_blogfontdefault2(inputs)
	return uk_blogfontdefault2(inputs)
});
export { blogfontdefault2 as "blogFontDefault" }