/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubytesting5Inputs */



/**
* | output |
* | --- |
* | "Ruby test framework." |
*
* @param {Docsclisummaryrubyrubytesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubytesting5 = /** @type {((inputs?: Docsclisummaryrubyrubytesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubytesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework de pruebas de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby 测试框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby のテストフレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby 테스트 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby 測試框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-Testframework.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework de test Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фреймворк тестування Ruby.")
	return /** @type {LocalizedString} */ ("Ruby test framework.")
});
export { docsclisummaryrubyrubytesting5 as "docsCliSummaryRubyRubyTesting" }