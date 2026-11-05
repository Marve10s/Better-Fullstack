/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpvalidation5Inputs */

const en_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP validation library.`)
};

const es_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de validación de PHP.`)
};

const zh_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 验证库。`)
};

const ja_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP の検証ライブラリ。`)
};

const ko_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 검증 라이브러리.`)
};

const zh_hant1_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 驗證函式庫。`)
};

const de_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-Validierungsbibliothek.`)
};

const fr_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de validation PHP.`)
};

const uk_docsclisummaryphpphpvalidation5 = /** @type {(inputs: Docsclisummaryphpphpvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека валідації PHP.`)
};

/**
* | output |
* | --- |
* | "PHP validation library." |
*
* @param {Docsclisummaryphpphpvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpvalidation5 = /** @type {((inputs?: Docsclisummaryphpphpvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphpvalidation5(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphpvalidation5(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphpvalidation5(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphpvalidation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphpvalidation5(inputs)
	if (locale === "de") return de_docsclisummaryphpphpvalidation5(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphpvalidation5(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphpvalidation5(inputs)
	return en_docsclisummaryphpphpvalidation5(inputs)
});
export { docsclisummaryphpphpvalidation5 as "docsCliSummaryPhpPhpValidation" }