/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavatestinglibraries6Inputs */



/**
* | output |
* | --- |
* | "Java testing libraries." |
*
* @param {Docsclisummaryjavajavatestinglibraries6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavatestinglibraries6 = /** @type {((inputs?: Docsclisummaryjavajavatestinglibraries6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavatestinglibraries6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas de pruebas de Java.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Java 测试库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Java のテストライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Java 테스트 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Java 測試函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testbibliotheken für Java.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques de tests Java.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки тестування Java.")
	return /** @type {LocalizedString} */ ("Java testing libraries.")
});
export { docsclisummaryjavajavatestinglibraries6 as "docsCliSummaryJavaJavaTestingLibraries" }