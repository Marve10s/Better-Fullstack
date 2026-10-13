/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavatestinglibraries6Inputs */

const en_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java testing libraries.`)
};

const es_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas de pruebas de Java.`)
};

const zh_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 测试库。`)
};

const ja_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java のテストライブラリ。`)
};

const ko_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 테스트 라이브러리.`)
};

const zh_hant1_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 測試函式庫。`)
};

const de_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testbibliotheken für Java.`)
};

const fr_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques de tests Java.`)
};

const uk_docsclisummaryjavajavatestinglibraries6 = /** @type {(inputs: Docsclisummaryjavajavatestinglibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки тестування Java.`)
};

/**
* | output |
* | --- |
* | "Java testing libraries." |
*
* @param {Docsclisummaryjavajavatestinglibraries6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavatestinglibraries6 = /** @type {((inputs?: Docsclisummaryjavajavatestinglibraries6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavatestinglibraries6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavatestinglibraries6(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavatestinglibraries6(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavatestinglibraries6(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavatestinglibraries6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavatestinglibraries6(inputs)
	if (locale === "de") return de_docsclisummaryjavajavatestinglibraries6(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavatestinglibraries6(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavatestinglibraries6(inputs)
	return en_docsclisummaryjavajavatestinglibraries6(inputs)
});
export { docsclisummaryjavajavatestinglibraries6 as "docsCliSummaryJavaJavaTestingLibraries" }