/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativekotlinmobile6Inputs */



/**
* | output |
* | --- |
* | "Kotlin mobile app." |
*
* @param {Docsclisummaryreactnativekotlinmobile6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativekotlinmobile6 = /** @type {((inputs?: Docsclisummaryreactnativekotlinmobile6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativekotlinmobile6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aplicación móvil Kotlin.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Kotlin 移动应用。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Kotlin モバイルアプリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Kotlin 모바일 앱.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Kotlin 行動應用程式。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mobile App mit Kotlin.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Application mobile Kotlin.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Мобільний застосунок Kotlin.")
	return /** @type {LocalizedString} */ ("Kotlin mobile app.")
});
export { docsclisummaryreactnativekotlinmobile6 as "docsCliSummaryReactNativeKotlinMobile" }