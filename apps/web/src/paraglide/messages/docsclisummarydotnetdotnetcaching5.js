/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetcaching5Inputs */



/**
* | output |
* | --- |
* | ".NET caching." |
*
* @param {Docsclisummarydotnetdotnetcaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetcaching5 = /** @type {((inputs?: Docsclisummarydotnetdotnetcaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetcaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Caché en .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 缓存。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のキャッシュ。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 캐싱.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 快取。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Caching für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mise en cache .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Кешування в .NET.")
	return /** @type {LocalizedString} */ (".NET caching.")
});
export { docsclisummarydotnetdotnetcaching5 as "docsCliSummaryDotnetDotnetCaching" }