/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativeswiftmobile6Inputs */



/**
* | output |
* | --- |
* | "Swift mobile app." |
*
* @param {Docsclisummaryreactnativeswiftmobile6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativeswiftmobile6 = /** @type {((inputs?: Docsclisummaryreactnativeswiftmobile6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativeswiftmobile6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aplicación móvil Swift.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Swift 移动应用。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Swift モバイルアプリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Swift 모바일 앱.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Swift 行動應用程式。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mobile App mit Swift.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Application mobile Swift.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Мобільний застосунок Swift.")
	return /** @type {LocalizedString} */ ("Swift mobile app.")
});
export { docsclisummaryreactnativeswiftmobile6 as "docsCliSummaryReactNativeSwiftMobile" }