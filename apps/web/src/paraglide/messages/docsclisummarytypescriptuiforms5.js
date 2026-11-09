/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuiforms5Inputs */



/**
* | output |
* | --- |
* | "Form library." |
*
* @param {Docsclisummarytypescriptuiforms5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuiforms5 = /** @type {((inputs?: Docsclisummarytypescriptuiforms5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuiforms5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de formularios.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("表单库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フォームライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("폼 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("表單函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Formularbibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de formulaires.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека форм.")
	return /** @type {LocalizedString} */ ("Form library.")
});
export { docsclisummarytypescriptuiforms5 as "docsCliSummaryTypescriptUiForms" }