/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubywebframework6Inputs */



/**
* | output |
* | --- |
* | "Ruby HTTP framework." |
*
* @param {Docsclisummaryrubyrubywebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubywebframework6 = /** @type {((inputs?: Docsclisummaryrubyrubywebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubywebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework HTTP de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby HTTP 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby の HTTP フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby HTTP 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby HTTP 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-HTTP-Framework.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework HTTP Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("HTTP-фреймворк Ruby.")
	return /** @type {LocalizedString} */ ("Ruby HTTP framework.")
});
export { docsclisummaryrubyrubywebframework6 as "docsCliSummaryRubyRubyWebFramework" }