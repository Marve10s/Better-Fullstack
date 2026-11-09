/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubylogging5Inputs */



/**
* | output |
* | --- |
* | "Ruby request logging." |
*
* @param {Docsclisummaryrubyrubylogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubylogging5 = /** @type {((inputs?: Docsclisummaryrubyrubylogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubylogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Registro de solicitudes de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby 请求日志。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby のリクエストログ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby 요청 로깅.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby 請求日誌。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-Anfrageprotokollierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Journalisation des requêtes Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Логування запитів Ruby.")
	return /** @type {LocalizedString} */ ("Ruby request logging.")
});
export { docsclisummaryrubyrubylogging5 as "docsCliSummaryRubyRubyLogging" }