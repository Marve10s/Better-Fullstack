/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubylogging5Inputs */

const en_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby request logging.`)
};

const es_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Registro de solicitudes de Ruby.`)
};

const zh_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 请求日志。`)
};

const ja_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby のリクエストログ。`)
};

const ko_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 요청 로깅.`)
};

const zh_hant1_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 請求日誌。`)
};

const de_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-Anfrageprotokollierung.`)
};

const fr_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Journalisation des requêtes Ruby.`)
};

const uk_docsclisummaryrubyrubylogging5 = /** @type {(inputs: Docsclisummaryrubyrubylogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Логування запитів Ruby.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubylogging5(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubylogging5(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubylogging5(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubylogging5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubylogging5(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubylogging5(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubylogging5(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubylogging5(inputs)
	return en_docsclisummaryrubyrubylogging5(inputs)
});
export { docsclisummaryrubyrubylogging5 as "docsCliSummaryRubyRubyLogging" }