/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonquality5Inputs */

const en_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python code quality tool.`)
};

const es_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramienta de calidad de código Python.`)
};

const zh_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 代码质量工具。`)
};

const ja_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のコード品質ツール。`)
};

const ko_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 코드 품질 도구.`)
};

const zh_hant1_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 程式碼品質工具。`)
};

const de_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Werkzeug für Codequalität in Python.`)
};

const fr_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outil de qualité du code Python.`)
};

const uk_docsclisummarypythonpythonquality5 = /** @type {(inputs: Docsclisummarypythonpythonquality5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інструмент якості коду Python.`)
};

/**
* | output |
* | --- |
* | "Python code quality tool." |
*
* @param {Docsclisummarypythonpythonquality5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonquality5 = /** @type {((inputs?: Docsclisummarypythonpythonquality5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonquality5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonquality5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonquality5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonquality5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonquality5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonquality5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonquality5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonquality5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonquality5(inputs)
	return en_docsclisummarypythonpythonquality5(inputs)
});
export { docsclisummarypythonpythonquality5 as "docsCliSummaryPythonPythonQuality" }