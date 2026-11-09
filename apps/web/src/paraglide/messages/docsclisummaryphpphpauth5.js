/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpauth5Inputs */



/**
* | output |
* | --- |
* | "PHP authentication." |
*
* @param {Docsclisummaryphpphpauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpauth5 = /** @type {((inputs?: Docsclisummaryphpphpauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP 认证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP の認証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP 인증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP 認證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-Authentifizierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація PHP.")
	return /** @type {LocalizedString} */ ("PHP authentication.")
});
export { docsclisummaryphpphpauth5 as "docsCliSummaryPhpPhpAuth" }