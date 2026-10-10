/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustlibraries5Inputs */

const en_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust core libraries.`)
};

const es_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas fundamentales de Rust.`)
};

const zh_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 核心库。`)
};

const ja_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust のコアライブラリ。`)
};

const ko_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 핵심 라이브러리.`)
};

const zh_hant1_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 核心函式庫。`)
};

const de_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Grundlegende Rust-Bibliotheken.`)
};

const fr_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques fondamentales Rust.`)
};

const uk_docsclisummaryrustrustlibraries5 = /** @type {(inputs: Docsclisummaryrustrustlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Основні бібліотеки Rust.`)
};

/**
* | output |
* | --- |
* | "Rust core libraries." |
*
* @param {Docsclisummaryrustrustlibraries5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustlibraries5 = /** @type {((inputs?: Docsclisummaryrustrustlibraries5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustlibraries5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustlibraries5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustlibraries5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustlibraries5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustlibraries5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustlibraries5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustlibraries5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustlibraries5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustlibraries5(inputs)
	return en_docsclisummaryrustrustlibraries5(inputs)
});
export { docsclisummaryrustrustlibraries5 as "docsCliSummaryRustRustLibraries" }