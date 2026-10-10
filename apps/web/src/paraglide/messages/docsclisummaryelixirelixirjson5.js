/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirjson5Inputs */

const en_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir JSON library.`)
};

const es_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca JSON Elixir.`)
};

const zh_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir JSON 库。`)
};

const ja_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の JSON ライブラリ。`)
};

const ko_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir JSON 라이브러리.`)
};

const zh_hant1_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir JSON 函式庫。`)
};

const de_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JSON-Bibliothek für Elixir.`)
};

const fr_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque JSON Elixir.`)
};

const uk_docsclisummaryelixirelixirjson5 = /** @type {(inputs: Docsclisummaryelixirelixirjson5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека JSON для Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir JSON library." |
*
* @param {Docsclisummaryelixirelixirjson5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirjson5 = /** @type {((inputs?: Docsclisummaryelixirelixirjson5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirjson5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirjson5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirjson5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirjson5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirjson5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirjson5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirjson5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirjson5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirjson5(inputs)
	return en_docsclisummaryelixirelixirjson5(inputs)
});
export { docsclisummaryelixirelixirjson5 as "docsCliSummaryElixirElixirJson" }