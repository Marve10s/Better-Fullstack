/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesintegrations5Inputs */

const en_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Third-party integrations SDK.`)
};

const es_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK de integraciones con terceros.`)
};

const zh_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`第三方集成 SDK。`)
};

const ja_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`サードパーティ統合の SDK。`)
};

const ko_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`서드파티 통합 SDK.`)
};

const zh_hant1_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`第三方整合 SDK。`)
};

const de_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK für Integrationen mit Drittanbietern.`)
};

const fr_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK d’intégration de services tiers.`)
};

const uk_docsclisummarytypescriptservicesintegrations5 = /** @type {(inputs: Docsclisummarytypescriptservicesintegrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK для інтеграцій зі сторонніми сервісами.`)
};

/**
* | output |
* | --- |
* | "Third-party integrations SDK." |
*
* @param {Docsclisummarytypescriptservicesintegrations5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesintegrations5 = /** @type {((inputs?: Docsclisummarytypescriptservicesintegrations5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesintegrations5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesintegrations5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesintegrations5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesintegrations5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesintegrations5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesintegrations5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesintegrations5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesintegrations5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesintegrations5(inputs)
	return en_docsclisummarytypescriptservicesintegrations5(inputs)
});
export { docsclisummarytypescriptservicesintegrations5 as "docsCliSummaryTypescriptServicesIntegrations" }