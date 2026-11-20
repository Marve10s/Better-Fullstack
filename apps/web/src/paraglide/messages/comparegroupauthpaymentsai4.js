/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupauthpaymentsai4Inputs */



/**
* | output |
* | --- |
* | "Auth, Payments & AI" |
*
* @param {Comparegroupauthpaymentsai4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparegroupauthpaymentsai4 = /** @type {((inputs?: Comparegroupauthpaymentsai4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupauthpaymentsai4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Auth, pagos e IA")
	if (locale === "zh") return /** @type {LocalizedString} */ ("认证、支付与 AI")
	if (locale === "ja") return /** @type {LocalizedString} */ ("認証、支払い、AI")
	if (locale === "ko") return /** @type {LocalizedString} */ ("인증, 결제 및 AI")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("認證、付款與 AI")
	if (locale === "de") return /** @type {LocalizedString} */ ("Authentifizierung, Zahlungen und AI")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification, paiements et AI")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація, платежі та AI")
	return /** @type {LocalizedString} */ ("Auth, Payments & AI")
});
export { comparegroupauthpaymentsai4 as "compareGroupAuthPaymentsAi" }