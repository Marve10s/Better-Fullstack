/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirtesting5Inputs */

const en_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir testing.`)
};

const es_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pruebas en Elixir.`)
};

const zh_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 测试。`)
};

const ja_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のテスト。`)
};

const ko_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 테스트.`)
};

const zh_hant1_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 測試。`)
};

const de_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tests für Elixir.`)
};

const fr_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tests Elixir.`)
};

const uk_docsclisummaryelixirelixirtesting5 = /** @type {(inputs: Docsclisummaryelixirelixirtesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Тестування Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir testing." |
*
* @param {Docsclisummaryelixirelixirtesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirtesting5 = /** @type {((inputs?: Docsclisummaryelixirelixirtesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirtesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirtesting5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirtesting5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirtesting5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirtesting5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirtesting5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirtesting5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirtesting5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirtesting5(inputs)
	return en_docsclisummaryelixirelixirtesting5(inputs)
});
export { docsclisummaryelixirelixirtesting5 as "docsCliSummaryElixirElixirTesting" }