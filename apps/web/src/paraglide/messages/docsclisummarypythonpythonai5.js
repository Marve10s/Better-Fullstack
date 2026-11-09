/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonai5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas de AI / ML de Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python AI / ML 库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の AI / ML ライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python AI / ML 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python AI / ML 函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("AI- / ML-Bibliotheken für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques d’AI / ML Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки AI / ML для Python.")
	return /** @type {LocalizedString} */ ("Python AI / ML libraries.")
});
export { docsclisummarypythonpythonai5 as "docsCliSummaryPythonPythonAi" }