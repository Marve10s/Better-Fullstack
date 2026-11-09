/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativekotlinmobilelibraries7Inputs */



/**
* | output |
* | --- |
* | "Optional Kotlin mobile libraries." |
*
* @param {Docsclisummaryreactnativekotlinmobilelibraries7Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativekotlinmobilelibraries7 = /** @type {((inputs?: Docsclisummaryreactnativekotlinmobilelibraries7Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativekotlinmobilelibraries7Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas móviles opcionales de Kotlin.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可选的 Kotlin 移动端库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("オプションの Kotlin モバイルライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("선택적 Kotlin 모바일 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("選用的 Kotlin 行動裝置函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Optionale Kotlin-Bibliotheken für mobile Apps.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques mobiles Kotlin facultatives.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Необов’язкові мобільні бібліотеки Kotlin.")
	return /** @type {LocalizedString} */ ("Optional Kotlin mobile libraries.")
});
export { docsclisummaryreactnativekotlinmobilelibraries7 as "docsCliSummaryReactNativeKotlinMobileLibraries" }