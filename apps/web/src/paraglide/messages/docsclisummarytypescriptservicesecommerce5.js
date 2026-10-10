/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesecommerce5Inputs */

const en_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`E-commerce platform SDK.`)
};

const es_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK de plataforma de comercio electrónico.`)
};

const zh_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`电商平台 SDK。`)
};

const ja_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`EC プラットフォームの SDK。`)
};

const ko_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이커머스 플랫폼 SDK.`)
};

const zh_hant1_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`電子商務平台 SDK。`)
};

const de_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK für E-Commerce-Plattformen.`)
};

const fr_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK de plateforme e-commerce.`)
};

const uk_docsclisummarytypescriptservicesecommerce5 = /** @type {(inputs: Docsclisummarytypescriptservicesecommerce5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK платформи електронної комерції.`)
};

/**
* | output |
* | --- |
* | "E-commerce platform SDK." |
*
* @param {Docsclisummarytypescriptservicesecommerce5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesecommerce5 = /** @type {((inputs?: Docsclisummarytypescriptservicesecommerce5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesecommerce5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesecommerce5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesecommerce5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesecommerce5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesecommerce5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesecommerce5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesecommerce5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesecommerce5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesecommerce5(inputs)
	return en_docsclisummarytypescriptservicesecommerce5(inputs)
});
export { docsclisummarytypescriptservicesecommerce5 as "docsCliSummaryTypescriptServicesEcommerce" }