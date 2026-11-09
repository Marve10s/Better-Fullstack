/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyemail5Inputs */



/**
* | output |
* | --- |
* | "Ruby email delivery." |
*
* @param {Docsclisummaryrubyrubyemail5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubyemail5 = /** @type {((inputs?: Docsclisummaryrubyrubyemail5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubyemail5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Envío de correo de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby 邮件发送。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby のメール送信。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby 이메일 전송.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby 郵件傳送。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-E-Mail-Versand.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Envoi d’e-mails Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Надсилання пошти Ruby.")
	return /** @type {LocalizedString} */ ("Ruby email delivery.")
});
export { docsclisummaryrubyrubyemail5 as "docsCliSummaryRubyRubyEmail" }