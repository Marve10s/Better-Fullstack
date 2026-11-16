/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpvalidation5Inputs */



/**
* | output |
* | --- |
* | "PHP validation library." |
*
* @param {Docsclisummaryphpphpvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpvalidation5 = /** @type {((inputs?: Docsclisummaryphpphpvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de validación de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP 验证库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP の検証ライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP 검증 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP 驗證函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-Validierungsbibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de validation PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека валідації PHP.")
	return /** @type {LocalizedString} */ ("PHP validation library.")
});
export { docsclisummaryphpphpvalidation5 as "docsCliSummaryPhpPhpValidation" }