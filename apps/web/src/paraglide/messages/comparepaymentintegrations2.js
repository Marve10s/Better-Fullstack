/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparepaymentintegrations2Inputs */



/**
* | output |
* | --- |
* | "Payment integrations" |
*
* @param {Comparepaymentintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparepaymentintegrations2 = /** @type {((inputs?: Comparepaymentintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepaymentintegrations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Integraciones de pago")
	if (locale === "zh") return /** @type {LocalizedString} */ ("支付集成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("支払いの統合")
	if (locale === "ko") return /** @type {LocalizedString} */ ("결제 통합")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("支付整合")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zahlungsintegrationen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Intégrations de paiement")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Платіжні інтеграції")
	return /** @type {LocalizedString} */ ("Payment integrations")
});
export { comparepaymentintegrations2 as "comparePaymentIntegrations" }