/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogreadinglong2Inputs */



/**
* | output |
* | --- |
* | "Long" |
*
* @param {Blogreadinglong2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogreadinglong2 = /** @type {((inputs?: Blogreadinglong2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogreadinglong2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Larga")
	if (locale === "zh") return /** @type {LocalizedString} */ ("完整版")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ロング")
	if (locale === "ko") return /** @type {LocalizedString} */ ("길게")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("完整版")
	if (locale === "de") return /** @type {LocalizedString} */ ("Lang")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Longue")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Повна")
	return /** @type {LocalizedString} */ ("Long")
});
export { blogreadinglong2 as "blogReadingLong" }