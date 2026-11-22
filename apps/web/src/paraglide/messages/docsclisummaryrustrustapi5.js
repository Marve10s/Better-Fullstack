/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustapi5Inputs */



/**
* | output |
* | --- |
* | "Rust API layer." |
*
* @param {Docsclisummaryrustrustapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustapi5 = /** @type {((inputs?: Docsclisummaryrustrustapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Capa API Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust API 层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust の API レイヤー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust API 계층.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust API 層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("API-Schicht für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Couche API Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шар API для Rust.")
	return /** @type {LocalizedString} */ ("Rust API layer.")
});
export { docsclisummaryrustrustapi5 as "docsCliSummaryRustRustApi" }