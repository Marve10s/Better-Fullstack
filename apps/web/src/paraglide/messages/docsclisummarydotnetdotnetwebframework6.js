/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetwebframework6Inputs */



/**
* | output |
* | --- |
* | ".NET web framework." |
*
* @param {Docsclisummarydotnetdotnetwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetwebframework6 = /** @type {((inputs?: Docsclisummarydotnetdotnetwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework web .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET Web 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET の Web フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 웹 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET Web 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Web-Framework für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework web .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вебфреймворк .NET.")
	return /** @type {LocalizedString} */ (".NET web framework.")
});
export { docsclisummarydotnetdotnetwebframework6 as "docsCliSummaryDotnetDotnetWebFramework" }