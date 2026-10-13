/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesobservability5Inputs */

const en_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observability provider.`)
};

const es_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proveedor de observabilidad.`)
};

const zh_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可观测性服务商。`)
};

const ja_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`オブザーバビリティのプロバイダー。`)
};

const ko_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`관측성 제공자.`)
};

const zh_hant1_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可觀測性服務商。`)
};

const de_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observability-Anbieter.`)
};

const fr_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fournisseur d’observabilité.`)
};

const uk_docsclisummarytypescriptservicesobservability5 = /** @type {(inputs: Docsclisummarytypescriptservicesobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Провайдер спостережуваності.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesobservability5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesobservability5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesobservability5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesobservability5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesobservability5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesobservability5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesobservability5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesobservability5(inputs)
	return en_docsclisummarytypescriptservicesobservability5(inputs)
});
export { docsclisummarytypescriptservicesobservability5 as "docsCliSummaryTypescriptServicesObservability" }