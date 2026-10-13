/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirlibraries5Inputs */

const en_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir libraries.`)
};

const es_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas Elixir.`)
};

const zh_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 库。`)
};

const ja_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のライブラリ。`)
};

const ko_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 라이브러리.`)
};

const zh_hant1_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 函式庫。`)
};

const de_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir-Bibliotheken.`)
};

const fr_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques Elixir.`)
};

const uk_docsclisummaryelixirelixirlibraries5 = /** @type {(inputs: Docsclisummaryelixirelixirlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir libraries." |
*
* @param {Docsclisummaryelixirelixirlibraries5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirlibraries5 = /** @type {((inputs?: Docsclisummaryelixirelixirlibraries5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirlibraries5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirlibraries5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirlibraries5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirlibraries5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirlibraries5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirlibraries5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirlibraries5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirlibraries5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirlibraries5(inputs)
	return en_docsclisummaryelixirelixirlibraries5(inputs)
});
export { docsclisummaryelixirelixirlibraries5 as "docsCliSummaryElixirElixirLibraries" }