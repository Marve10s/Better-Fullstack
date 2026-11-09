/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustcaching5Inputs */



/**
* | output |
* | --- |
* | "Rust caching." |
*
* @param {Docsclisummaryrustrustcaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustcaching5 = /** @type {((inputs?: Docsclisummaryrustrustcaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustcaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Caché en Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 缓存。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust のキャッシュ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 캐싱.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 快取。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Caching für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mise en cache Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Кешування в Rust.")
	return /** @type {LocalizedString} */ ("Rust caching.")
});
export { docsclisummaryrustrustcaching5 as "docsCliSummaryRustRustCaching" }