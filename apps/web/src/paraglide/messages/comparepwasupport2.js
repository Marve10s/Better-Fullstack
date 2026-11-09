/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparepwasupport2Inputs */



/**
* | output |
* | --- |
* | "PWA support" |
*
* @param {Comparepwasupport2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparepwasupport2 = /** @type {((inputs?: Comparepwasupport2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepwasupport2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Soporte PWA")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PWA 支持")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PWAのサポート")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PWA 지원")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PWA 支援")
	if (locale === "de") return /** @type {LocalizedString} */ ("PWA-Unterstützung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Prise en charge des PWA")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Підтримка PWA")
	return /** @type {LocalizedString} */ ("PWA support")
});
export { comparepwasupport2 as "comparePwaSupport" }