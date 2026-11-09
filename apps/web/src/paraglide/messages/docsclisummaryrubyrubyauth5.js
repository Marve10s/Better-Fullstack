/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyauth5Inputs */



/**
* | output |
* | --- |
* | "Ruby authentication." |
*
* @param {Docsclisummaryrubyrubyauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubyauth5 = /** @type {((inputs?: Docsclisummaryrubyrubyauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubyauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby 认证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby の認証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby 인증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby 認證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-Authentifizierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація Ruby.")
	return /** @type {LocalizedString} */ ("Ruby authentication.")
});
export { docsclisummaryrubyrubyauth5 as "docsCliSummaryRubyRubyAuth" }