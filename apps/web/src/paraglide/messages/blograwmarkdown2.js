/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blograwmarkdown2Inputs */



/**
* | output |
* | --- |
* | "Markdown" |
*
* @param {Blograwmarkdown2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blograwmarkdown2 = /** @type {((inputs?: Blograwmarkdown2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blograwmarkdown2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Markdown")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Markdown")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Markdown")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Markdown")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Markdown")
	if (locale === "de") return /** @type {LocalizedString} */ ("Markdown")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Markdown")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Markdown")
	return /** @type {LocalizedString} */ ("Markdown")
});
export { blograwmarkdown2 as "blogRawMarkdown" }