/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesecommerce5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("SDK de plataforma de comercio electrónico.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("电商平台 SDK。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("EC プラットフォームの SDK。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이커머스 플랫폼 SDK.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("電子商務平台 SDK。")
	if (locale === "de") return /** @type {LocalizedString} */ ("SDK für E-Commerce-Plattformen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("SDK de plateforme e-commerce.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("SDK платформи електронної комерції.")
	return /** @type {LocalizedString} */ ("E-commerce platform SDK.")
});
export { docsclisummarytypescriptservicesecommerce5 as "docsCliSummaryTypescriptServicesEcommerce" }