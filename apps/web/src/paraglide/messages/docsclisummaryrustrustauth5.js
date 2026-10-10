/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustauth5Inputs */

const en_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust auth.`)
};

const es_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación en Rust.`)
};

const zh_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 认证。`)
};

const ja_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust の認証。`)
};

const ko_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 인증.`)
};

const zh_hant1_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 驗證。`)
};

const de_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierung für Rust.`)
};

const fr_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification Rust.`)
};

const uk_docsclisummaryrustrustauth5 = /** @type {(inputs: Docsclisummaryrustrustauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автентифікація в Rust.`)
};

/**
* | output |
* | --- |
* | "Rust auth." |
*
* @param {Docsclisummaryrustrustauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustauth5 = /** @type {((inputs?: Docsclisummaryrustrustauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustauth5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustauth5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustauth5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustauth5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustauth5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustauth5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustauth5(inputs)
	return en_docsclisummaryrustrustauth5(inputs)
});
export { docsclisummaryrustrustauth5 as "docsCliSummaryRustRustAuth" }