/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirlibraries5Inputs */



/**
* | output |
* | --- |
* | "Elixir libraries." |
*
* @param {Docsclisummaryelixirelixirlibraries5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirlibraries5 = /** @type {((inputs?: Docsclisummaryelixirelixirlibraries5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirlibraries5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Elixir-Bibliotheken.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки Elixir.")
	return /** @type {LocalizedString} */ ("Elixir libraries.")
});
export { docsclisummaryelixirelixirlibraries5 as "docsCliSummaryElixirElixirLibraries" }