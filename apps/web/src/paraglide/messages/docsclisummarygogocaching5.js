/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogocaching5Inputs */



/**
* | output |
* | --- |
* | "Go caching." |
*
* @param {Docsclisummarygogocaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogocaching5 = /** @type {((inputs?: Docsclisummarygogocaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogocaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Caché en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 缓存。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のキャッシュ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 캐싱.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 快取。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Caching für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mise en cache Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Кешування в Go.")
	return /** @type {LocalizedString} */ ("Go caching.")
});
export { docsclisummarygogocaching5 as "docsCliSummaryGoGoCaching" }