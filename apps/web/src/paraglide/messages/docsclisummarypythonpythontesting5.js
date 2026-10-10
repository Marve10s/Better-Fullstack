/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythontesting5Inputs */

const en_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python testing libraries.`)
};

const es_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas de pruebas de Python.`)
};

const zh_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 测试库。`)
};

const ja_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のテストライブラリ。`)
};

const ko_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 테스트 라이브러리.`)
};

const zh_hant1_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 測試函式庫。`)
};

const de_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testbibliotheken für Python.`)
};

const fr_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques de tests Python.`)
};

const uk_docsclisummarypythonpythontesting5 = /** @type {(inputs: Docsclisummarypythonpythontesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки тестування Python.`)
};

/**
* | output |
* | --- |
* | "Python testing libraries." |
*
* @param {Docsclisummarypythonpythontesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythontesting5 = /** @type {((inputs?: Docsclisummarypythonpythontesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythontesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythontesting5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythontesting5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythontesting5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythontesting5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythontesting5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythontesting5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythontesting5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythontesting5(inputs)
	return en_docsclisummarypythonpythontesting5(inputs)
});
export { docsclisummarypythonpythontesting5 as "docsCliSummaryPythonPythonTesting" }