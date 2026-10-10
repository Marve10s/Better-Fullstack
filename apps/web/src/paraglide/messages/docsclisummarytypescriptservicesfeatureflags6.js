/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesfeatureflags6Inputs */

const en_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feature flag platform.`)
};

const es_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plataforma de feature flags.`)
};

const zh_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`功能开关平台。`)
};

const ja_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フィーチャーフラグのプラットフォーム。`)
};

const ko_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기능 플래그 플랫폼.`)
};

const zh_hant1_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`功能旗標平台。`)
};

const de_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plattform für Feature-Flags.`)
};

const fr_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plateforme de feature flags.`)
};

const uk_docsclisummarytypescriptservicesfeatureflags6 = /** @type {(inputs: Docsclisummarytypescriptservicesfeatureflags6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Платформа прапорців функцій.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesfeatureflags6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesfeatureflags6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesfeatureflags6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesfeatureflags6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesfeatureflags6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesfeatureflags6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesfeatureflags6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesfeatureflags6(inputs)
	return en_docsclisummarytypescriptservicesfeatureflags6(inputs)
});
export { docsclisummarytypescriptservicesfeatureflags6 as "docsCliSummaryTypescriptServicesFeatureFlags" }