/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonai5Inputs */

const en_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python AI / ML libraries.`)
};

const es_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas de AI / ML de Python.`)
};

const zh_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python AI / ML 库。`)
};

const ja_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の AI / ML ライブラリ。`)
};

const ko_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python AI / ML 라이브러리.`)
};

const zh_hant1_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python AI / ML 函式庫。`)
};

const de_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI- / ML-Bibliotheken für Python.`)
};

const fr_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques d’AI / ML Python.`)
};

const uk_docsclisummarypythonpythonai5 = /** @type {(inputs: Docsclisummarypythonpythonai5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки AI / ML для Python.`)
};

/**
* | output |
* | --- |
* | "Python AI / ML libraries." |
*
* @param {Docsclisummarypythonpythonai5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonai5 = /** @type {((inputs?: Docsclisummarypythonpythonai5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonai5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonai5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonai5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonai5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonai5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonai5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonai5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonai5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonai5(inputs)
	return en_docsclisummarypythonpythonai5(inputs)
});
export { docsclisummarypythonpythonai5 as "docsCliSummaryPythonPythonAi" }