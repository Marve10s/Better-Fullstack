/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonvalidation5Inputs */

const en_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validation library.`)
};

const es_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de validación.`)
};

const zh_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`校验库。`)
};

const ja_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バリデーションライブラリ。`)
};

const ko_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검증 라이브러리.`)
};

const zh_hant1_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`驗證函式庫。`)
};

const de_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validierungsbibliothek.`)
};

const fr_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de validation.`)
};

const uk_docsclisummarypythonpythonvalidation5 = /** @type {(inputs: Docsclisummarypythonpythonvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека валідації.`)
};

/**
* | output |
* | --- |
* | "Validation library." |
*
* @param {Docsclisummarypythonpythonvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonvalidation5 = /** @type {((inputs?: Docsclisummarypythonpythonvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonvalidation5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonvalidation5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonvalidation5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonvalidation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonvalidation5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonvalidation5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonvalidation5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonvalidation5(inputs)
	return en_docsclisummarypythonpythonvalidation5(inputs)
});
export { docsclisummarypythonpythonvalidation5 as "docsCliSummaryPythonPythonValidation" }