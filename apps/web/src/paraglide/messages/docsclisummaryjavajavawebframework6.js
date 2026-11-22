/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavawebframework6Inputs */



/**
* | output |
* | --- |
* | "Java web framework." |
*
* @param {Docsclisummaryjavajavawebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavawebframework6 = /** @type {((inputs?: Docsclisummaryjavajavawebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavawebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework web Java.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Java Web 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Java の Web フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Java 웹 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Java Web 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Web-Framework für Java.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework web Java.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вебфреймворк Java.")
	return /** @type {LocalizedString} */ ("Java web framework.")
});
export { docsclisummaryjavajavawebframework6 as "docsCliSummaryJavaJavaWebFramework" }