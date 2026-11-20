/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixiremail5Inputs */



/**
* | output |
* | --- |
* | "Elixir email." |
*
* @param {Docsclisummaryelixirelixiremail5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixiremail5 = /** @type {((inputs?: Docsclisummaryelixirelixiremail5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixiremail5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Correo electrónico en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 邮件。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のメール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 이메일.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 電子郵件。")
	if (locale === "de") return /** @type {LocalizedString} */ ("E-Mail für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("E-mail Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Електронна пошта в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir email.")
});
export { docsclisummaryelixirelixiremail5 as "docsCliSummaryElixirElixirEmail" }