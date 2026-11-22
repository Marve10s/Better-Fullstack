/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesobservability5Inputs */



/**
* | output |
* | --- |
* | "Observability provider." |
*
* @param {Docsclisummarytypescriptservicesobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesobservability5 = /** @type {((inputs?: Docsclisummarytypescriptservicesobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proveedor de observabilidad.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可观测性服务商。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("オブザーバビリティのプロバイダー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("관측성 제공자.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("可觀測性服務商。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Observability-Anbieter.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fournisseur d’observabilité.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Провайдер спостережуваності.")
	return /** @type {LocalizedString} */ ("Observability provider.")
});
export { docsclisummarytypescriptservicesobservability5 as "docsCliSummaryTypescriptServicesObservability" }