/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirconfig5Inputs */



/**
* | output |
* | --- |
* | "Elixir runtime configuration." |
*
* @param {Docsclisummaryelixirelixirconfig5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirconfig5 = /** @type {((inputs?: Docsclisummaryelixirelixirconfig5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirconfig5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configuración en tiempo de ejecución para Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 运行时配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の実行時設定。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 런타임 설정.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 執行階段設定。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Laufzeitkonfiguration für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configuration d'exécution Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Конфігурація під час виконання в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir runtime configuration.")
});
export { docsclisummaryelixirelixirconfig5 as "docsCliSummaryElixirElixirConfig" }