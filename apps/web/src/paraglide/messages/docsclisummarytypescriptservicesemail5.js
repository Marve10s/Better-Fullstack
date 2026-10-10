/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesemail5Inputs */

const en_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email provider.`)
};

const es_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proveedor de correo electrónico.`)
};

const zh_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮件服务商。`)
};

const ja_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`メールプロバイダー。`)
};

const ko_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이메일 제공자.`)
};

const zh_hant1_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`電子郵件服務商。`)
};

const de_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`E-Mail-Anbieter.`)
};

const fr_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fournisseur d’e-mails.`)
};

const uk_docsclisummarytypescriptservicesemail5 = /** @type {(inputs: Docsclisummarytypescriptservicesemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Провайдер електронної пошти.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesemail5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesemail5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesemail5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesemail5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesemail5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesemail5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesemail5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesemail5(inputs)
	return en_docsclisummarytypescriptservicesemail5(inputs)
});
export { docsclisummarytypescriptservicesemail5 as "docsCliSummaryTypescriptServicesEmail" }