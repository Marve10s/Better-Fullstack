/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetlibraries5Inputs */

const en_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optional .NET libraries.`)
};

const es_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas opcionales de .NET.`)
};

const zh_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可选的 .NET 库。`)
};

const ja_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`オプションの .NET ライブラリ。`)
};

const ko_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`선택적 .NET 라이브러리.`)
};

const zh_hant1_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選用的 .NET 函式庫。`)
};

const de_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optionale .NET-Bibliotheken.`)
};

const fr_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques .NET facultatives.`)
};

const uk_docsclisummarydotnetdotnetlibraries5 = /** @type {(inputs: Docsclisummarydotnetdotnetlibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Необов’язкові бібліотеки .NET.`)
};

/**
* | output |
* | --- |
* | "Optional .NET libraries." |
*
* @param {Docsclisummarydotnetdotnetlibraries5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetlibraries5 = /** @type {((inputs?: Docsclisummarydotnetdotnetlibraries5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetlibraries5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetlibraries5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetlibraries5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetlibraries5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetlibraries5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetlibraries5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetlibraries5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetlibraries5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetlibraries5(inputs)
	return en_docsclisummarydotnetdotnetlibraries5(inputs)
});
export { docsclisummarydotnetdotnetlibraries5 as "docsCliSummaryDotnetDotnetLibraries" }