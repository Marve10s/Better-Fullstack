/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirapplicationframework6Inputs */



/**
* | output |
* | --- |
* | "Elixir application framework." |
*
* @param {Docsclisummaryelixirelixirapplicationframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirapplicationframework6 = /** @type {((inputs?: Docsclisummaryelixirelixirapplicationframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirapplicationframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework de aplicaciones Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 应用框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のアプリケーションフレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 애플리케이션 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 應用程式框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Anwendungsframework für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework d’application Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фреймворк застосунків Elixir.")
	return /** @type {LocalizedString} */ ("Elixir application framework.")
});
export { docsclisummaryelixirelixirapplicationframework6 as "docsCliSummaryElixirElixirApplicationFramework" }