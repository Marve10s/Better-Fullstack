/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogowebframework6Inputs */



/**
* | output |
* | --- |
* | "Go web framework." |
*
* @param {Docsclisummarygogowebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogowebframework6 = /** @type {((inputs?: Docsclisummarygogowebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogowebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework web Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go Web 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go の Web フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 웹 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go Web 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Web-Framework für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework web Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вебфреймворк Go.")
	return /** @type {LocalizedString} */ ("Go web framework.")
});
export { docsclisummarygogowebframework6 as "docsCliSummaryGoGoWebFramework" }