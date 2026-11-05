/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyemail5Inputs */

const en_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby email delivery.`)
};

const es_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Envío de correo de Ruby.`)
};

const zh_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 邮件发送。`)
};

const ja_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby のメール送信。`)
};

const ko_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 이메일 전송.`)
};

const zh_hant1_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 郵件傳送。`)
};

const de_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-E-Mail-Versand.`)
};

const fr_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Envoi d’e-mails Ruby.`)
};

const uk_docsclisummaryrubyrubyemail5 = /** @type {(inputs: Docsclisummaryrubyrubyemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Надсилання пошти Ruby.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubyemail5(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubyemail5(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubyemail5(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubyemail5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubyemail5(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubyemail5(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubyemail5(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubyemail5(inputs)
	return en_docsclisummaryrubyrubyemail5(inputs)
});
export { docsclisummaryrubyrubyemail5 as "docsCliSummaryRubyRubyEmail" }