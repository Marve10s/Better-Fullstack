/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuivalidation5Inputs */

const en_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schema validation library.`)
};

const es_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de validación de esquemas.`)
};

const zh_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schema 校验库。`)
};

const ja_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スキーマバリデーションライブラリ。`)
};

const ko_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스키마 검증 라이브러리.`)
};

const zh_hant1_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schema 驗證函式庫。`)
};

const de_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothek zur Schemavalidierung.`)
};

const fr_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de validation de schémas.`)
};

const uk_docsclisummarytypescriptuivalidation5 = /** @type {(inputs: Docsclisummarytypescriptuivalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека валідації схем.`)
};

/**
* | output |
* | --- |
* | "Schema validation library." |
*
* @param {Docsclisummarytypescriptuivalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuivalidation5 = /** @type {((inputs?: Docsclisummarytypescriptuivalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuivalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptuivalidation5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptuivalidation5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptuivalidation5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptuivalidation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptuivalidation5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptuivalidation5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptuivalidation5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptuivalidation5(inputs)
	return en_docsclisummarytypescriptuivalidation5(inputs)
});
export { docsclisummarytypescriptuivalidation5 as "docsCliSummaryTypescriptUiValidation" }