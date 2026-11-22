/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustauth5Inputs */



/**
* | output |
* | --- |
* | "Rust auth." |
*
* @param {Docsclisummaryrustrustauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustauth5 = /** @type {((inputs?: Docsclisummaryrustrustauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación en Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 认证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust の認証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 인증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Authentifizierung für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація в Rust.")
	return /** @type {LocalizedString} */ ("Rust auth.")
});
export { docsclisummaryrustrustauth5 as "docsCliSummaryRustRustAuth" }