/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirhttp5Inputs */



/**
* | output |
* | --- |
* | "Elixir HTTP client." |
*
* @param {Docsclisummaryelixirelixirhttp5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirhttp5 = /** @type {((inputs?: Docsclisummaryelixirelixirhttp5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirhttp5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cliente HTTP Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir HTTP 客户端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の HTTP クライアント。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir HTTP 클라이언트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir HTTP 用戶端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("HTTP-Client für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Client HTTP Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("HTTP-клієнт Elixir.")
	return /** @type {LocalizedString} */ ("Elixir HTTP client.")
});
export { docsclisummaryelixirelixirhttp5 as "docsCliSummaryElixirElixirHttp" }