/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesfeatureflags6Inputs */



/**
* | output |
* | --- |
* | "Feature flag platform." |
*
* @param {Docsclisummarytypescriptservicesfeatureflags6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesfeatureflags6 = /** @type {((inputs?: Docsclisummarytypescriptservicesfeatureflags6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesfeatureflags6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Plataforma de feature flags.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("功能开关平台。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フィーチャーフラグのプラットフォーム。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기능 플래그 플랫폼.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("功能旗標平台。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Plattform für Feature-Flags.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Plateforme de feature flags.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Платформа прапорців функцій.")
	return /** @type {LocalizedString} */ ("Feature flag platform.")
});
export { docsclisummarytypescriptservicesfeatureflags6 as "docsCliSummaryTypescriptServicesFeatureFlags" }