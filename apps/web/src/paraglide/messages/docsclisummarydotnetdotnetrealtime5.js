/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetrealtime5Inputs */



/**
* | output |
* | --- |
* | ".NET realtime." |
*
* @param {Docsclisummarydotnetdotnetrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetrealtime5 = /** @type {((inputs?: Docsclisummarydotnetdotnetrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comunicación en tiempo real en .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 实时通信。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のリアルタイム通信。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 실시간 통신.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 即時通訊。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Echtzeitkommunikation für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Communication en temps réel .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Комунікація в реальному часі в .NET.")
	return /** @type {LocalizedString} */ (".NET realtime.")
});
export { docsclisummarydotnetdotnetrealtime5 as "docsCliSummaryDotnetDotnetRealtime" }