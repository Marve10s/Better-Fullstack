/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustwebframework6Inputs */



/**
* | output |
* | --- |
* | "Rust web framework." |
*
* @param {Docsclisummaryrustrustwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustwebframework6 = /** @type {((inputs?: Docsclisummaryrustrustwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework web Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust Web 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust の Web フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 웹 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust Web 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Web-Framework für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework web Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вебфреймворк Rust.")
	return /** @type {LocalizedString} */ ("Rust web framework.")
});
export { docsclisummaryrustrustwebframework6 as "docsCliSummaryRustRustWebFramework" }