/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirquality5Inputs */



/**
* | output |
* | --- |
* | "Elixir code quality." |
*
* @param {Docsclisummaryelixirelixirquality5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirquality5 = /** @type {((inputs?: Docsclisummaryelixirelixirquality5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirquality5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Calidad de código Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 代码质量。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のコード品質。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 코드 품질.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 程式碼品質。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Codequalität für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Qualité du code Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Якість коду Elixir.")
	return /** @type {LocalizedString} */ ("Elixir code quality.")
});
export { docsclisummaryelixirelixirquality5 as "docsCliSummaryElixirElixirQuality" }