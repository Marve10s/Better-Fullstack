/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirlogging5Inputs */



/**
* | output |
* | --- |
* | "Elixir logging." |
*
* @param {Docsclisummaryelixirelixirlogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirlogging5 = /** @type {((inputs?: Docsclisummaryelixirelixirlogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirlogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Registro de logs en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 日志。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のロギング。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 로깅.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 日誌。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Logging für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Journalisation Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Логування в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir logging.")
});
export { docsclisummaryelixirelixirlogging5 as "docsCliSummaryElixirElixirLogging" }