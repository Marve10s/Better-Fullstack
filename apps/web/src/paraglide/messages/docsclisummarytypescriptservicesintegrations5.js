/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesintegrations5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("SDK de integraciones con terceros.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("第三方集成 SDK。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("サードパーティ統合の SDK。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("서드파티 통합 SDK.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("第三方整合 SDK。")
	if (locale === "de") return /** @type {LocalizedString} */ ("SDK für Integrationen mit Drittanbietern.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("SDK d’intégration de services tiers.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("SDK для інтеграцій зі сторонніми сервісами.")
	return /** @type {LocalizedString} */ ("Third-party integrations SDK.")
});
export { docsclisummarytypescriptservicesintegrations5 as "docsCliSummaryTypescriptServicesIntegrations" }