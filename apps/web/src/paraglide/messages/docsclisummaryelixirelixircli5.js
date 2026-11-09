/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixircli5Inputs */



/**
* | output |
* | --- |
* | "Elixir command-line tooling." |
*
* @param {Docsclisummaryelixirelixircli5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixircli5 = /** @type {((inputs?: Docsclisummaryelixirelixircli5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixircli5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramientas de línea de comandos para Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 命令行工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のコマンドラインツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 명령줄 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 命令列工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Kommandozeilen-Tools für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outils en ligne de commande Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інструменти командного рядка для Elixir.")
	return /** @type {LocalizedString} */ ("Elixir command-line tooling.")
});
export { docsclisummaryelixirelixircli5 as "docsCliSummaryElixirElixirCli" }