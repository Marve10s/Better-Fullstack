/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativedartmobile6Inputs */



/**
* | output |
* | --- |
* | "Flutter / Dart mobile app." |
*
* @param {Docsclisummaryreactnativedartmobile6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativedartmobile6 = /** @type {((inputs?: Docsclisummaryreactnativedartmobile6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativedartmobile6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aplicación móvil Flutter / Dart.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Flutter / Dart 移动应用。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Flutter / Dart モバイルアプリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Flutter / Dart 모바일 앱.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Flutter / Dart 行動應用程式。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mobile App mit Flutter / Dart.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Application mobile Flutter / Dart.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Мобільний застосунок Flutter / Dart.")
	return /** @type {LocalizedString} */ ("Flutter / Dart mobile app.")
});
export { docsclisummaryreactnativedartmobile6 as "docsCliSummaryReactNativeDartMobile" }