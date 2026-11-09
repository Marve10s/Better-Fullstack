/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicespayments5Inputs */



/**
* | output |
* | --- |
* | "Payments provider." |
*
* @param {Docsclisummarytypescriptservicespayments5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicespayments5 = /** @type {((inputs?: Docsclisummarytypescriptservicespayments5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicespayments5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proveedor de pagos.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("支付服务商。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("決済プロバイダー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("결제 제공자.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("付款服務商。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zahlungsanbieter.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fournisseur de paiements.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Провайдер платежів.")
	return /** @type {LocalizedString} */ ("Payments provider.")
});
export { docsclisummarytypescriptservicespayments5 as "docsCliSummaryTypescriptServicesPayments" }