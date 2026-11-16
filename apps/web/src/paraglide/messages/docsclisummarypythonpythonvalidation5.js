/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonvalidation5Inputs */



/**
* | output |
* | --- |
* | "Validation library." |
*
* @param {Docsclisummarypythonpythonvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonvalidation5 = /** @type {((inputs?: Docsclisummarypythonpythonvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de validación.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("校验库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("バリデーションライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검증 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("驗證函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Validierungsbibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de validation.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека валідації.")
	return /** @type {LocalizedString} */ ("Validation library.")
});
export { docsclisummarypythonpythonvalidation5 as "docsCliSummaryPythonPythonValidation" }