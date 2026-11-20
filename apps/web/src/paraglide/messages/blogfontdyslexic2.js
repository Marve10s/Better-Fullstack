/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogfontdyslexic2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Dislexia")
	if (locale === "zh") return /** @type {LocalizedString} */ ("阅读障碍友好")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ディスレクシア")
	if (locale === "ko") return /** @type {LocalizedString} */ ("난독증 친화")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("閱讀障礙友善")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dyslexie")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dyslexie")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Дислексія")
	return /** @type {LocalizedString} */ ("Dyslexic")
});
export { blogfontdyslexic2 as "blogFontDyslexic" }