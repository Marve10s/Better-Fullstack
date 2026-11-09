/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythontesting5Inputs */



/**
* | output |
* | --- |
* | "Python testing libraries." |
*
* @param {Docsclisummarypythonpythontesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythontesting5 = /** @type {((inputs?: Docsclisummarypythonpythontesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythontesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas de pruebas de Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 测试库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のテストライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 테스트 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 測試函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testbibliotheken für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques de tests Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки тестування Python.")
	return /** @type {LocalizedString} */ ("Python testing libraries.")
});
export { docsclisummarypythonpythontesting5 as "docsCliSummaryPythonPythonTesting" }