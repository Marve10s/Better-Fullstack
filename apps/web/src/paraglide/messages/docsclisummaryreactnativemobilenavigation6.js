/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobilenavigation6Inputs */



/**
* | output |
* | --- |
* | "Navigation library." |
*
* @param {Docsclisummaryreactnativemobilenavigation6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobilenavigation6 = /** @type {((inputs?: Docsclisummaryreactnativemobilenavigation6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobilenavigation6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de navegación.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("导航库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ナビゲーションライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("내비게이션 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("導覽函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Navigationsbibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de navigation.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека навігації.")
	return /** @type {LocalizedString} */ ("Navigation library.")
});
export { docsclisummaryreactnativemobilenavigation6 as "docsCliSummaryReactNativeMobileNavigation" }