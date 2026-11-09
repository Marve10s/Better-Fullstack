/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustlibraries5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas fundamentales de Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 核心库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust のコアライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 핵심 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 核心函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Grundlegende Rust-Bibliotheken.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques fondamentales Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Основні бібліотеки Rust.")
	return /** @type {LocalizedString} */ ("Rust core libraries.")
});
export { docsclisummaryrustrustlibraries5 as "docsCliSummaryRustRustLibraries" }