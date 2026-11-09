/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirrealtime5Inputs */



/**
* | output |
* | --- |
* | "Elixir realtime." |
*
* @param {Docsclisummaryelixirelixirrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirrealtime5 = /** @type {((inputs?: Docsclisummaryelixirelixirrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comunicación en tiempo real en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 实时通信。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のリアルタイム通信。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 실시간 통신.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 即時通訊。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Echtzeitkommunikation für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Communication en temps réel Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Комунікація в реальному часі в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir realtime.")
});
export { docsclisummaryelixirelixirrealtime5 as "docsCliSummaryElixirElixirRealtime" }