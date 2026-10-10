/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicespayments5Inputs */

const en_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Payments provider.`)
};

const es_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proveedor de pagos.`)
};

const zh_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支付服务商。`)
};

const ja_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`決済プロバイダー。`)
};

const ko_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`결제 제공자.`)
};

const zh_hant1_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`付款服務商。`)
};

const de_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zahlungsanbieter.`)
};

const fr_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fournisseur de paiements.`)
};

const uk_docsclisummarytypescriptservicespayments5 = /** @type {(inputs: Docsclisummarytypescriptservicespayments5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Провайдер платежів.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicespayments5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicespayments5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicespayments5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicespayments5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicespayments5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicespayments5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicespayments5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicespayments5(inputs)
	return en_docsclisummarytypescriptservicespayments5(inputs)
});
export { docsclisummarytypescriptservicespayments5 as "docsCliSummaryTypescriptServicesPayments" }