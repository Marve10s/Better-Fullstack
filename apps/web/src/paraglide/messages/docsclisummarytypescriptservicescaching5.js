/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicescaching5Inputs */



/**
* | output |
* | --- |
* | "Cache layer." |
*
* @param {Docsclisummarytypescriptservicescaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicescaching5 = /** @type {((inputs?: Docsclisummarytypescriptservicescaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicescaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Capa de caché.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("缓存层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("キャッシュレイヤー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("캐시 계층.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("快取層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Cache-Schicht.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Couche de cache.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шар кешування.")
	return /** @type {LocalizedString} */ ("Cache layer.")
});
export { docsclisummarytypescriptservicescaching5 as "docsCliSummaryTypescriptServicesCaching" }