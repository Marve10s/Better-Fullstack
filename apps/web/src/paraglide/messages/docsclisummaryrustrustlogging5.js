/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustlogging5Inputs */

const en_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust logging.`)
};

const es_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Registro de eventos en Rust.`)
};

const zh_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 日志。`)
};

const ja_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust のロギング。`)
};

const ko_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 로깅.`)
};

const zh_hant1_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 日誌。`)
};

const de_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logging für Rust.`)
};

const fr_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Journalisation Rust.`)
};

const uk_docsclisummaryrustrustlogging5 = /** @type {(inputs: Docsclisummaryrustrustlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Журналювання в Rust.`)
};

/**
* | output |
* | --- |
* | "Rust logging." |
*
* @param {Docsclisummaryrustrustlogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustlogging5 = /** @type {((inputs?: Docsclisummaryrustrustlogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustlogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustlogging5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustlogging5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustlogging5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustlogging5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustlogging5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustlogging5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustlogging5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustlogging5(inputs)
	return en_docsclisummaryrustrustlogging5(inputs)
});
export { docsclisummaryrustrustlogging5 as "docsCliSummaryRustRustLogging" }