/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphptesting5Inputs */



/**
* | output |
* | --- |
* | "PHP test runner." |
*
* @param {Docsclisummaryphpphptesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphptesting5 = /** @type {((inputs?: Docsclisummaryphpphptesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphptesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecutor de pruebas de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP 测试运行器。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP のテストランナー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP 테스트 러너.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP 測試執行器。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-Testrunner.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Lanceur de tests PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Засіб запуску тестів PHP.")
	return /** @type {LocalizedString} */ ("PHP test runner.")
});
export { docsclisummaryphpphptesting5 as "docsCliSummaryPhpPhpTesting" }