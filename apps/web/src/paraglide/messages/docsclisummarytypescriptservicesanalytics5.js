/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesanalytics5Inputs */



/**
* | output |
* | --- |
* | "Web analytics provider." |
*
* @param {Docsclisummarytypescriptservicesanalytics5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesanalytics5 = /** @type {((inputs?: Docsclisummarytypescriptservicesanalytics5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesanalytics5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proveedor de analítica web.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Web 分析服务商。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Web 解析プロバイダー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("웹 분석 제공자.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Web 分析服務商。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Anbieter für Web-Analysen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fournisseur d’analyse web.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Провайдер вебаналітики.")
	return /** @type {LocalizedString} */ ("Web analytics provider.")
});
export { docsclisummarytypescriptservicesanalytics5 as "docsCliSummaryTypescriptServicesAnalytics" }