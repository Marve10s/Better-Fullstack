/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptserviceseffect5Inputs */



/**
* | output |
* | --- |
* | "Effect capability level." |
*
* @param {Docsclisummarytypescriptserviceseffect5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptserviceseffect5 = /** @type {((inputs?: Docsclisummarytypescriptserviceseffect5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptserviceseffect5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Nivel de funcionalidades de Effect.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Effect 使用级别。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Effect の利用レベル。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Effect 사용 수준.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Effect 使用層級。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Funktionsumfang von Effect.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Niveau de fonctionnalités d’Effect.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Рівень можливостей Effect.")
	return /** @type {LocalizedString} */ ("Effect capability level.")
});
export { docsclisummarytypescriptserviceseffect5 as "docsCliSummaryTypescriptServicesEffect" }