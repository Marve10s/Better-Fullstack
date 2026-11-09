/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetfrontend5Inputs */



/**
* | output |
* | --- |
* | ".NET frontend." |
*
* @param {Docsclisummarydotnetdotnetfrontend5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetfrontend5 = /** @type {((inputs?: Docsclisummarydotnetdotnetfrontend5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetfrontend5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Frontend .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 前端。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のフロントエンド。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 프런트엔드.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 前端。")
	if (locale === "de") return /** @type {LocalizedString} */ (".NET-Frontend.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Frontend .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фронтенд .NET.")
	return /** @type {LocalizedString} */ (".NET frontend.")
});
export { docsclisummarydotnetdotnetfrontend5 as "docsCliSummaryDotnetDotnetFrontend" }