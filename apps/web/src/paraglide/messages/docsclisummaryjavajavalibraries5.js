/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavalibraries5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas Java.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Java 库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Java のライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Java 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Java 函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Java-Bibliotheken.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques Java.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки Java.")
	return /** @type {LocalizedString} */ ("Java libraries.")
});
export { docsclisummaryjavajavalibraries5 as "docsCliSummaryJavaJavaLibraries" }