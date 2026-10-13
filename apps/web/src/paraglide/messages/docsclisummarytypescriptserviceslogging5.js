/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptserviceslogging5Inputs */

const en_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logging library.`)
};

const es_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de registro de eventos.`)
};

const zh_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`日志库。`)
};

const ja_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ロギングライブラリ。`)
};

const ko_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`로깅 라이브러리.`)
};

const zh_hant1_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`日誌函式庫。`)
};

const de_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logging-Bibliothek.`)
};

const fr_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de journalisation.`)
};

const uk_docsclisummarytypescriptserviceslogging5 = /** @type {(inputs: Docsclisummarytypescriptserviceslogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека журналювання.`)
};

/**
* | output |
* | --- |
* | "Logging library." |
*
* @param {Docsclisummarytypescriptserviceslogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptserviceslogging5 = /** @type {((inputs?: Docsclisummarytypescriptserviceslogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptserviceslogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptserviceslogging5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptserviceslogging5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptserviceslogging5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptserviceslogging5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptserviceslogging5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptserviceslogging5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptserviceslogging5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptserviceslogging5(inputs)
	return en_docsclisummarytypescriptserviceslogging5(inputs)
});
export { docsclisummarytypescriptserviceslogging5 as "docsCliSummaryTypescriptServicesLogging" }