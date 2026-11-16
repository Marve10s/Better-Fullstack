/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavalanguage5Inputs */



/**
* | output |
* | --- |
* | "JVM language (java or kotlin)." |
*
* @param {Docsclisummaryjavajavalanguage5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavalanguage5 = /** @type {((inputs?: Docsclisummaryjavajavalanguage5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavalanguage5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Lenguaje JVM (java o kotlin).")
	if (locale === "zh") return /** @type {LocalizedString} */ ("JVM 语言（java 或 kotlin）。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("JVM 言語 (java または kotlin)。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("JVM 언어(java 또는 kotlin).")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("JVM 語言（java 或 kotlin）。")
	if (locale === "de") return /** @type {LocalizedString} */ ("JVM-Sprache (java oder kotlin).")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Langage JVM (java ou kotlin).")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Мова JVM (java або kotlin).")
	return /** @type {LocalizedString} */ ("JVM language (java or kotlin).")
});
export { docsclisummaryjavajavalanguage5 as "docsCliSummaryJavaJavaLanguage" }