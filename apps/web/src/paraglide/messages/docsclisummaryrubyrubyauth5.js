/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyauth5Inputs */

const en_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby authentication.`)
};

const es_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación de Ruby.`)
};

const zh_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 认证。`)
};

const ja_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby の認証。`)
};

const ko_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 인증.`)
};

const zh_hant1_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 認證。`)
};

const de_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-Authentifizierung.`)
};

const fr_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification Ruby.`)
};

const uk_docsclisummaryrubyrubyauth5 = /** @type {(inputs: Docsclisummaryrubyrubyauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автентифікація Ruby.`)
};

/**
* | output |
* | --- |
* | "Ruby authentication." |
*
* @param {Docsclisummaryrubyrubyauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubyauth5 = /** @type {((inputs?: Docsclisummaryrubyrubyauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubyauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubyauth5(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubyauth5(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubyauth5(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubyauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubyauth5(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubyauth5(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubyauth5(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubyauth5(inputs)
	return en_docsclisummaryrubyrubyauth5(inputs)
});
export { docsclisummaryrubyrubyauth5 as "docsCliSummaryRubyRubyAuth" }