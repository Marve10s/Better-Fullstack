/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetauth5Inputs */



/**
* | output |
* | --- |
* | ".NET auth." |
*
* @param {Docsclisummarydotnetdotnetauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetauth5 = /** @type {((inputs?: Docsclisummarydotnetdotnetauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación en .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 认证。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET の認証。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 인증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Authentifizierung für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація в .NET.")
	return /** @type {LocalizedString} */ (".NET auth.")
});
export { docsclisummarydotnetdotnetauth5 as "docsCliSummaryDotnetDotnetAuth" }