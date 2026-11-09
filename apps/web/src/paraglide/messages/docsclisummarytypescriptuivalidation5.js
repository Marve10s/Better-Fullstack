/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuivalidation5Inputs */



/**
* | output |
* | --- |
* | "Schema validation library." |
*
* @param {Docsclisummarytypescriptuivalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuivalidation5 = /** @type {((inputs?: Docsclisummarytypescriptuivalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuivalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de validación de esquemas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Schema 校验库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スキーマバリデーションライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스키마 검증 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Schema 驗證函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bibliothek zur Schemavalidierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de validation de schémas.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека валідації схем.")
	return /** @type {LocalizedString} */ ("Schema validation library.")
});
export { docsclisummarytypescriptuivalidation5 as "docsCliSummaryTypescriptUiValidation" }