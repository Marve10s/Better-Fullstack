/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythondata5Inputs */

const en_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python data and scientific libraries.`)
};

const es_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas científicas y de procesamiento de datos de Python.`)
};

const zh_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 数据与科学计算库。`)
};

const ja_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のデータ処理・科学計算ライブラリ。`)
};

const ko_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 데이터 및 과학 계산 라이브러리.`)
};

const zh_hant1_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 資料與科學運算函式庫。`)
};

const de_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datenverarbeitungs- und wissenschaftliche Bibliotheken für Python.`)
};

const fr_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques scientifiques et de traitement de données Python.`)
};

const uk_docsclisummarypythonpythondata5 = /** @type {(inputs: Docsclisummarypythonpythondata5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки Python для роботи з даними та наукових обчислень.`)
};

/**
* | output |
* | --- |
* | "Python data and scientific libraries." |
*
* @param {Docsclisummarypythonpythondata5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythondata5 = /** @type {((inputs?: Docsclisummarypythonpythondata5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythondata5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythondata5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythondata5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythondata5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythondata5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythondata5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythondata5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythondata5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythondata5(inputs)
	return en_docsclisummarypythonpythondata5(inputs)
});
export { docsclisummarypythonpythondata5 as "docsCliSummaryPythonPythonData" }