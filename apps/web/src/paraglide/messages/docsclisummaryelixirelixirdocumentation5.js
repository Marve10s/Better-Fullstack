/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirdocumentation5Inputs */



/**
* | output |
* | --- |
* | "Elixir documentation." |
*
* @param {Docsclisummaryelixirelixirdocumentation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirdocumentation5 = /** @type {((inputs?: Docsclisummaryelixirelixirdocumentation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirdocumentation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Documentación de Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 文档生成。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のドキュメント生成。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 문서화.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 文件產生。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dokumentation für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Documentation Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Документація Elixir.")
	return /** @type {LocalizedString} */ ("Elixir documentation.")
});
export { docsclisummaryelixirelixirdocumentation5 as "docsCliSummaryElixirElixirDocumentation" }