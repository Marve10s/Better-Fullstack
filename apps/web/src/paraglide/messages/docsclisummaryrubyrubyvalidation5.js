/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyvalidation5Inputs */

const en_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby request validation.`)
};

const es_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validación de solicitudes de Ruby.`)
};

const zh_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 请求验证。`)
};

const ja_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby のリクエスト検証。`)
};

const ko_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 요청 검증.`)
};

const zh_hant1_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 請求驗證。`)
};

const de_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-Anfragevalidierung.`)
};

const fr_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validation des requêtes Ruby.`)
};

const uk_docsclisummaryrubyrubyvalidation5 = /** @type {(inputs: Docsclisummaryrubyrubyvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Валідація запитів Ruby.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubyvalidation5(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubyvalidation5(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubyvalidation5(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubyvalidation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubyvalidation5(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubyvalidation5(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubyvalidation5(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubyvalidation5(inputs)
	return en_docsclisummaryrubyrubyvalidation5(inputs)
});
export { docsclisummaryrubyrubyvalidation5 as "docsCliSummaryRubyRubyValidation" }