/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirvalidation5Inputs */



/**
* | output |
* | --- |
* | "Elixir validation." |
*
* @param {Docsclisummaryelixirelixirvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirvalidation5 = /** @type {((inputs?: Docsclisummaryelixirelixirvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Validación en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 校验。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のバリデーション。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 검증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Validierung für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Validation Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Валідація в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir validation.")
});
export { docsclisummaryelixirelixirvalidation5 as "docsCliSummaryElixirElixirValidation" }