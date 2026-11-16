/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirtesting5Inputs */



/**
* | output |
* | --- |
* | "Elixir testing." |
*
* @param {Docsclisummaryelixirelixirtesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirtesting5 = /** @type {((inputs?: Docsclisummaryelixirelixirtesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirtesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Pruebas en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 测试。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のテスト。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 테스트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 測試。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Tests für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Tests Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Тестування Elixir.")
	return /** @type {LocalizedString} */ ("Elixir testing.")
});
export { docsclisummaryelixirelixirtesting5 as "docsCliSummaryElixirElixirTesting" }