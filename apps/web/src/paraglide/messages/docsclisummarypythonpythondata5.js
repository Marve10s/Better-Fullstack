/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythondata5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas científicas y de procesamiento de datos de Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 数据与科学计算库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のデータ処理・科学計算ライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 데이터 및 과학 계산 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 資料與科學運算函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Datenverarbeitungs- und wissenschaftliche Bibliotheken für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques scientifiques et de traitement de données Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки Python для роботи з даними та наукових обчислень.")
	return /** @type {LocalizedString} */ ("Python data and scientific libraries.")
});
export { docsclisummarypythonpythondata5 as "docsCliSummaryPythonPythonData" }