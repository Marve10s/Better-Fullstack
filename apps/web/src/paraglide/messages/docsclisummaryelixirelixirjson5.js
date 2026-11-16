/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirjson5Inputs */



/**
* | output |
* | --- |
* | "Elixir JSON library." |
*
* @param {Docsclisummaryelixirelixirjson5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirjson5 = /** @type {((inputs?: Docsclisummaryelixirelixirjson5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirjson5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca JSON Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir JSON 库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の JSON ライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir JSON 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir JSON 函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("JSON-Bibliothek für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque JSON Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека JSON для Elixir.")
	return /** @type {LocalizedString} */ ("Elixir JSON library.")
});
export { docsclisummaryelixirelixirjson5 as "docsCliSummaryElixirElixirJson" }