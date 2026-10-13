/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesanalytics5Inputs */

const en_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web analytics provider.`)
};

const es_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proveedor de analítica web.`)
};

const zh_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web 分析服务商。`)
};

const ja_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web 解析プロバイダー。`)
};

const ko_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`웹 분석 제공자.`)
};

const zh_hant1_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web 分析服務商。`)
};

const de_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anbieter für Web-Analysen.`)
};

const fr_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fournisseur d’analyse web.`)
};

const uk_docsclisummarytypescriptservicesanalytics5 = /** @type {(inputs: Docsclisummarytypescriptservicesanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Провайдер вебаналітики.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesanalytics5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesanalytics5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesanalytics5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesanalytics5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesanalytics5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesanalytics5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesanalytics5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesanalytics5(inputs)
	return en_docsclisummarytypescriptservicesanalytics5(inputs)
});
export { docsclisummarytypescriptservicesanalytics5 as "docsCliSummaryTypescriptServicesAnalytics" }