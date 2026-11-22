/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackauth5Inputs */



/**
* | output |
* | --- |
* | "Authentication provider." |
*
* @param {Docsclisummarytypescriptstackauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackauth5 = /** @type {((inputs?: Docsclisummarytypescriptstackauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proveedor de autenticación.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("认证提供方。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("認証プロバイダー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("인증 제공자.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("驗證服務商。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Authentifizierungsanbieter.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fournisseur d’authentification.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Провайдер автентифікації.")
	return /** @type {LocalizedString} */ ("Authentication provider.")
});
export { docsclisummarytypescriptstackauth5 as "docsCliSummaryTypescriptStackAuth" }