/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyvalidation5Inputs */



/**
* | output |
* | --- |
* | "Ruby request validation." |
*
* @param {Docsclisummaryrubyrubyvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubyvalidation5 = /** @type {((inputs?: Docsclisummaryrubyrubyvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubyvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Validación de solicitudes de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby 请求验证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby のリクエスト検証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby 요청 검증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby 請求驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-Anfragevalidierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Validation des requêtes Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Валідація запитів Ruby.")
	return /** @type {LocalizedString} */ ("Ruby request validation.")
});
export { docsclisummaryrubyrubyvalidation5 as "docsCliSummaryRubyRubyValidation" }