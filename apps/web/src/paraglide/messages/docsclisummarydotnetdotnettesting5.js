/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnettesting5Inputs */

const en_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET testing libraries.`)
};

const es_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas de pruebas de .NET.`)
};

const zh_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 测试库。`)
};

const ja_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のテストライブラリ。`)
};

const ko_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 테스트 라이브러리.`)
};

const zh_hant1_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 測試函式庫。`)
};

const de_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testbibliotheken für .NET.`)
};

const fr_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques de tests .NET.`)
};

const uk_docsclisummarydotnetdotnettesting5 = /** @type {(inputs: Docsclisummarydotnetdotnettesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки тестування .NET.`)
};

/**
* | output |
* | --- |
* | ".NET testing libraries." |
*
* @param {Docsclisummarydotnetdotnettesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnettesting5 = /** @type {((inputs?: Docsclisummarydotnetdotnettesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnettesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnettesting5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnettesting5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnettesting5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnettesting5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnettesting5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnettesting5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnettesting5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnettesting5(inputs)
	return en_docsclisummarydotnetdotnettesting5(inputs)
});
export { docsclisummarydotnetdotnettesting5 as "docsCliSummaryDotnetDotnetTesting" }