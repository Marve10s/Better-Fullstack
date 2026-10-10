/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuiforms5Inputs */

const en_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Form library.`)
};

const es_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de formularios.`)
};

const zh_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`表单库。`)
};

const ja_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フォームライブラリ。`)
};

const ko_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`폼 라이브러리.`)
};

const zh_hant1_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`表單函式庫。`)
};

const de_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Formularbibliothek.`)
};

const fr_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de formulaires.`)
};

const uk_docsclisummarytypescriptuiforms5 = /** @type {(inputs: Docsclisummarytypescriptuiforms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека форм.`)
};

/**
* | output |
* | --- |
* | "Form library." |
*
* @param {Docsclisummarytypescriptuiforms5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuiforms5 = /** @type {((inputs?: Docsclisummarytypescriptuiforms5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuiforms5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptuiforms5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptuiforms5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptuiforms5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptuiforms5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptuiforms5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptuiforms5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptuiforms5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptuiforms5(inputs)
	return en_docsclisummarytypescriptuiforms5(inputs)
});
export { docsclisummarytypescriptuiforms5 as "docsCliSummaryTypescriptUiForms" }