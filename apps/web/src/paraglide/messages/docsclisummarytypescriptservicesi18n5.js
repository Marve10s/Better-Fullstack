/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesi18n5Inputs */



/**
* | output |
* | --- |
* | "Internationalization library." |
*
* @param {Docsclisummarytypescriptservicesi18n5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesi18n5 = /** @type {((inputs?: Docsclisummarytypescriptservicesi18n5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesi18n5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de internacionalización.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("国际化库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("国際化ライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("국제화 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("國際化函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Internationalisierungsbibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque d’internationalisation.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека інтернаціоналізації.")
	return /** @type {LocalizedString} */ ("Internationalization library.")
});
export { docsclisummarytypescriptservicesi18n5 as "docsCliSummaryTypescriptServicesI18n" }