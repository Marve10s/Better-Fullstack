/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixircaching5Inputs */



/**
* | output |
* | --- |
* | "Elixir caching." |
*
* @param {Docsclisummaryelixirelixircaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixircaching5 = /** @type {((inputs?: Docsclisummaryelixirelixircaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixircaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Caché en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 缓存。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のキャッシュ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 캐싱.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 快取。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Caching für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mise en cache Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Кешування в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir caching.")
});
export { docsclisummaryelixirelixircaching5 as "docsCliSummaryElixirElixirCaching" }