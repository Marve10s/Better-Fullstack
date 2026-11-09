/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetobservability5Inputs */



/**
* | output |
* | --- |
* | ".NET observability." |
*
* @param {Docsclisummarydotnetdotnetobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetobservability5 = /** @type {((inputs?: Docsclisummarydotnetdotnetobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Observabilidad en .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 可观测性。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のオブザーバビリティ。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 관측성.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 可觀測性。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Observability für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Observabilité .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спостережуваність у .NET.")
	return /** @type {LocalizedString} */ (".NET observability.")
});
export { docsclisummarydotnetdotnetobservability5 as "docsCliSummaryDotnetDotnetObservability" }