/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Toconthispage3Inputs */



/**
* | output |
* | --- |
* | "On this page" |
*
* @param {Toconthispage3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const toconthispage3 = /** @type {((inputs?: Toconthispage3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Toconthispage3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("En esta página")
	if (locale === "zh") return /** @type {LocalizedString} */ ("本页内容")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このページの内容")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 페이지에서")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("本頁內容")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auf dieser Seite")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sur cette page")
	if (locale === "uk") return /** @type {LocalizedString} */ ("На цій сторінці")
	return /** @type {LocalizedString} */ ("On this page")
});
export { toconthispage3 as "tocOnThisPage" }