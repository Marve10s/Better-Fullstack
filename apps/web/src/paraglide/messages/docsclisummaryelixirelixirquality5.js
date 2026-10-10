/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirquality5Inputs */

const en_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir code quality.`)
};

const es_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Calidad de código Elixir.`)
};

const zh_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 代码质量。`)
};

const ja_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のコード品質。`)
};

const ko_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 코드 품질.`)
};

const zh_hant1_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 程式碼品質。`)
};

const de_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Codequalität für Elixir.`)
};

const fr_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Qualité du code Elixir.`)
};

const uk_docsclisummaryelixirelixirquality5 = /** @type {(inputs: Docsclisummaryelixirelixirquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Якість коду Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir code quality." |
*
* @param {Docsclisummaryelixirelixirquality5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirquality5 = /** @type {((inputs?: Docsclisummaryelixirelixirquality5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirquality5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirquality5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirquality5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirquality5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirquality5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirquality5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirquality5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirquality5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirquality5(inputs)
	return en_docsclisummaryelixirelixirquality5(inputs)
});
export { docsclisummaryelixirelixirquality5 as "docsCliSummaryElixirElixirQuality" }