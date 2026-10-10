/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavalibraries5Inputs */

const en_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java libraries.`)
};

const es_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas Java.`)
};

const zh_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 库。`)
};

const ja_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java のライブラリ。`)
};

const ko_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 라이브러리.`)
};

const zh_hant1_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 函式庫。`)
};

const de_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java-Bibliotheken.`)
};

const fr_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques Java.`)
};

const uk_docsclisummaryjavajavalibraries5 = /** @type {(inputs: Docsclisummaryjavajavalibraries5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки Java.`)
};

/**
* | output |
* | --- |
* | "Java libraries." |
*
* @param {Docsclisummaryjavajavalibraries5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavalibraries5 = /** @type {((inputs?: Docsclisummaryjavajavalibraries5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavalibraries5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavalibraries5(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavalibraries5(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavalibraries5(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavalibraries5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavalibraries5(inputs)
	if (locale === "de") return de_docsclisummaryjavajavalibraries5(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavalibraries5(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavalibraries5(inputs)
	return en_docsclisummaryjavajavalibraries5(inputs)
});
export { docsclisummaryjavajavalibraries5 as "docsCliSummaryJavaJavaLibraries" }