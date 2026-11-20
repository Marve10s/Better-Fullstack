/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirwebframework6Inputs */



/**
* | output |
* | --- |
* | "Elixir web framework." |
*
* @param {Docsclisummaryelixirelixirwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirwebframework6 = /** @type {((inputs?: Docsclisummaryelixirelixirwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework web Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir Web 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の Web フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 웹 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir Web 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Web-Framework für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework web Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вебфреймворк Elixir.")
	return /** @type {LocalizedString} */ ("Elixir web framework.")
});
export { docsclisummaryelixirelixirwebframework6 as "docsCliSummaryElixirElixirWebFramework" }