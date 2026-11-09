/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesemail5Inputs */



/**
* | output |
* | --- |
* | "Email provider." |
*
* @param {Docsclisummarytypescriptservicesemail5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesemail5 = /** @type {((inputs?: Docsclisummarytypescriptservicesemail5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesemail5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proveedor de correo electrónico.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("邮件服务商。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("メールプロバイダー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이메일 제공자.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("電子郵件服務商。")
	if (locale === "de") return /** @type {LocalizedString} */ ("E-Mail-Anbieter.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fournisseur d’e-mails.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Провайдер електронної пошти.")
	return /** @type {LocalizedString} */ ("Email provider.")
});
export { docsclisummarytypescriptservicesemail5 as "docsCliSummaryTypescriptServicesEmail" }