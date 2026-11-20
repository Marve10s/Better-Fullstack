/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirapi5Inputs */



/**
* | output |
* | --- |
* | "Elixir API layer." |
*
* @param {Docsclisummaryelixirelixirapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirapi5 = /** @type {((inputs?: Docsclisummaryelixirelixirapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Capa API Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir API 层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の API レイヤー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir API 계층.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir API 層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("API-Schicht für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Couche API Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шар API для Elixir.")
	return /** @type {LocalizedString} */ ("Elixir API layer.")
});
export { docsclisummaryelixirelixirapi5 as "docsCliSummaryElixirElixirApi" }