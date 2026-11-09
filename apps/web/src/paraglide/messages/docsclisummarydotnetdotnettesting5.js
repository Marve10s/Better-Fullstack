/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnettesting5Inputs */



/**
* | output |
* | --- |
* | ".NET testing libraries." |
*
* @param {Docsclisummarydotnetdotnettesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnettesting5 = /** @type {((inputs?: Docsclisummarydotnetdotnettesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnettesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas de pruebas de .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 测试库。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のテストライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 테스트 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 測試函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testbibliotheken für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques de tests .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки тестування .NET.")
	return /** @type {LocalizedString} */ (".NET testing libraries.")
});
export { docsclisummarydotnetdotnettesting5 as "docsCliSummaryDotnetDotnetTesting" }