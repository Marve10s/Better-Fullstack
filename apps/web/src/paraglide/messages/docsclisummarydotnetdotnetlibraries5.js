/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetlibraries5Inputs */



/**
* | output |
* | --- |
* | "Optional .NET libraries." |
*
* @param {Docsclisummarydotnetdotnetlibraries5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetlibraries5 = /** @type {((inputs?: Docsclisummarydotnetdotnetlibraries5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetlibraries5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas opcionales de .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可选的 .NET 库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("オプションの .NET ライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("선택적 .NET 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("選用的 .NET 函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Optionale .NET-Bibliotheken.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques .NET facultatives.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Необов’язкові бібліотеки .NET.")
	return /** @type {LocalizedString} */ ("Optional .NET libraries.")
});
export { docsclisummarydotnetdotnetlibraries5 as "docsCliSummaryDotnetDotnetLibraries" }