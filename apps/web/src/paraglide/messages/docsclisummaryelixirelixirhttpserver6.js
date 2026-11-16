/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirhttpserver6Inputs */



/**
* | output |
* | --- |
* | "Elixir HTTP server." |
*
* @param {Docsclisummaryelixirelixirhttpserver6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirhttpserver6 = /** @type {((inputs?: Docsclisummaryelixirelixirhttpserver6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirhttpserver6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Servidor HTTP Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir HTTP 服务器。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の HTTP サーバー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir HTTP 서버.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir HTTP 伺服器。")
	if (locale === "de") return /** @type {LocalizedString} */ ("HTTP-Server für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Serveur HTTP Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("HTTP-сервер Elixir.")
	return /** @type {LocalizedString} */ ("Elixir HTTP server.")
});
export { docsclisummaryelixirelixirhttpserver6 as "docsCliSummaryElixirElixirHttpServer" }