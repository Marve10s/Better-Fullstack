/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirobservability5Inputs */



/**
* | output |
* | --- |
* | "Elixir observability." |
*
* @param {Docsclisummaryelixirelixirobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirobservability5 = /** @type {((inputs?: Docsclisummaryelixirelixirobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Observabilidad en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 可观测性。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のオブザーバビリティ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 관측성.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 可觀測性。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Observability für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Observabilité Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спостережуваність у Elixir.")
	return /** @type {LocalizedString} */ ("Elixir observability.")
});
export { docsclisummaryelixirelixirobservability5 as "docsCliSummaryElixirElixirObservability" }