/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesi18n5Inputs */

const en_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Internationalization library.`)
};

const es_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de internacionalización.`)
};

const zh_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`国际化库。`)
};

const ja_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`国際化ライブラリ。`)
};

const ko_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`국제화 라이브러리.`)
};

const zh_hant1_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`國際化函式庫。`)
};

const de_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Internationalisierungsbibliothek.`)
};

const fr_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque d’internationalisation.`)
};

const uk_docsclisummarytypescriptservicesi18n5 = /** @type {(inputs: Docsclisummarytypescriptservicesi18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека інтернаціоналізації.`)
};

/**
* | output |
* | --- |
* | "Internationalization library." |
*
* @param {Docsclisummarytypescriptservicesi18n5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesi18n5 = /** @type {((inputs?: Docsclisummarytypescriptservicesi18n5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesi18n5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesi18n5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesi18n5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesi18n5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesi18n5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesi18n5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesi18n5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesi18n5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesi18n5(inputs)
	return en_docsclisummarytypescriptservicesi18n5(inputs)
});
export { docsclisummarytypescriptservicesi18n5 as "docsCliSummaryTypescriptServicesI18n" }