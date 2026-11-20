/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirauth5Inputs */



/**
* | output |
* | --- |
* | "Elixir auth." |
*
* @param {Docsclisummaryelixirelixirauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirauth5 = /** @type {((inputs?: Docsclisummaryelixirelixirauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 认证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の認証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 인증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Authentifizierung für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir auth.")
});
export { docsclisummaryelixirelixirauth5 as "docsCliSummaryElixirElixirAuth" }