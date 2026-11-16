/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonquality5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramienta de calidad de código Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 代码质量工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のコード品質ツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 코드 품질 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 程式碼品質工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Werkzeug für Codequalität in Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outil de qualité du code Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інструмент якості коду Python.")
	return /** @type {LocalizedString} */ ("Python code quality tool.")
});
export { docsclisummarypythonpythonquality5 as "docsCliSummaryPythonPythonQuality" }