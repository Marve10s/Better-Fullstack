/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogfontdyslexic2Inputs */

const en_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dyslexic`)
};

const es_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dislexia`)
};

const zh_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读障碍友好`)
};

const ja_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ディスレクシア`)
};

const ko_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`난독증 친화`)
};

const zh_hant1_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閱讀障礙友善`)
};

const de_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dyslexie`)
};

const fr_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dyslexie`)
};

const uk_blogfontdyslexic2 = /** @type {(inputs: Blogfontdyslexic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Дислексія`)
};

/**
* | output |
* | --- |
* | "Dyslexic" |
*
* @param {Blogfontdyslexic2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogfontdyslexic2 = /** @type {((inputs?: Blogfontdyslexic2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogfontdyslexic2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogfontdyslexic2(inputs)
	if (locale === "es") return es_blogfontdyslexic2(inputs)
	if (locale === "zh") return zh_blogfontdyslexic2(inputs)
	if (locale === "ja") return ja_blogfontdyslexic2(inputs)
	if (locale === "ko") return ko_blogfontdyslexic2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogfontdyslexic2(inputs)
	if (locale === "de") return de_blogfontdyslexic2(inputs)
	if (locale === "fr") return fr_blogfontdyslexic2(inputs)
	return uk_blogfontdyslexic2(inputs)
});
export { blogfontdyslexic2 as "blogFontDyslexic" }