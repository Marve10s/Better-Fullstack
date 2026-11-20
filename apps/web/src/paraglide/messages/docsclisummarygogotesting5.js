/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogotesting5Inputs */



/**
* | output |
* | --- |
* | "Go testing libraries." |
*
* @param {Docsclisummarygogotesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogotesting5 = /** @type {((inputs?: Docsclisummarygogotesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogotesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas de pruebas de Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 测试库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のテストライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 테스트 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 測試函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testbibliotheken für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques de tests Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки тестування Go.")
	return /** @type {LocalizedString} */ ("Go testing libraries.")
});
export { docsclisummarygogotesting5 as "docsCliSummaryGoGoTesting" }