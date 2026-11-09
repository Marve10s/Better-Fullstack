/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobilelibraries6Inputs */



/**
* | output |
* | --- |
* | "Optional Expo modules." |
*
* @param {Docsclisummaryreactnativemobilelibraries6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobilelibraries6 = /** @type {((inputs?: Docsclisummaryreactnativemobilelibraries6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobilelibraries6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Módulos opcionales de Expo.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可选的 Expo 模块。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("オプションの Expo モジュール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("선택적 Expo 모듈.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("選用的 Expo 模組。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Optionale Expo-Module.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Modules Expo facultatifs.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Необов’язкові модулі Expo.")
	return /** @type {LocalizedString} */ ("Optional Expo modules.")
});
export { docsclisummaryreactnativemobilelibraries6 as "docsCliSummaryReactNativeMobileLibraries" }