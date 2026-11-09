/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixiri18n5Inputs */



/**
* | output |
* | --- |
* | "Elixir internationalization." |
*
* @param {Docsclisummaryelixirelixiri18n5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixiri18n5 = /** @type {((inputs?: Docsclisummaryelixirelixiri18n5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixiri18n5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Internacionalización en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 国际化。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の国際化。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 국제화.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 國際化。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Internationalisierung für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Internationalisation Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інтернаціоналізація в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir internationalization.")
});
export { docsclisummaryelixirelixiri18n5 as "docsCliSummaryElixirElixirI18n" }