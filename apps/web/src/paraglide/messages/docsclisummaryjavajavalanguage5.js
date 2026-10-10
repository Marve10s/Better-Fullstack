/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavalanguage5Inputs */

const en_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JVM language (java or kotlin).`)
};

const es_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lenguaje JVM (java o kotlin).`)
};

const zh_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JVM 语言（java 或 kotlin）。`)
};

const ja_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JVM 言語 (java または kotlin)。`)
};

const ko_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JVM 언어(java 또는 kotlin).`)
};

const zh_hant1_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JVM 語言（java 或 kotlin）。`)
};

const de_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JVM-Sprache (java oder kotlin).`)
};

const fr_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Langage JVM (java ou kotlin).`)
};

const uk_docsclisummaryjavajavalanguage5 = /** @type {(inputs: Docsclisummaryjavajavalanguage5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Мова JVM (java або kotlin).`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavalanguage5(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavalanguage5(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavalanguage5(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavalanguage5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavalanguage5(inputs)
	if (locale === "de") return de_docsclisummaryjavajavalanguage5(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavalanguage5(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavalanguage5(inputs)
	return en_docsclisummaryjavajavalanguage5(inputs)
});
export { docsclisummaryjavajavalanguage5 as "docsCliSummaryJavaJavaLanguage" }