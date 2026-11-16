/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetapi5Inputs */



/**
* | output |
* | --- |
* | ".NET API style." |
*
* @param {Docsclisummarydotnetdotnetapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetapi5 = /** @type {((inputs?: Docsclisummarydotnetdotnetapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Estilo de API .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET API 风格。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET の API スタイル。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET API 스타일.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET API 風格。")
	if (locale === "de") return /** @type {LocalizedString} */ ("API-Stil für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Style d’API .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Стиль API для .NET.")
	return /** @type {LocalizedString} */ (".NET API style.")
});
export { docsclisummarydotnetdotnetapi5 as "docsCliSummaryDotnetDotnetApi" }