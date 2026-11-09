/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogfontdefault2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Predeterminada")
	if (locale === "zh") return /** @type {LocalizedString} */ ("默认")
	if (locale === "ja") return /** @type {LocalizedString} */ ("標準")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기본")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Standard")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Par défaut")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Стандартний")
	return /** @type {LocalizedString} */ ("Default")
});
export { blogfontdefault2 as "blogFontDefault" }