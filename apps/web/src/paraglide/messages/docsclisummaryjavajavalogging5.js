/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavalogging5Inputs */

const en_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java logging.`)
};

const es_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Registro de eventos en Java.`)
};

const zh_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 日志。`)
};

const ja_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java のロギング。`)
};

const ko_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 로깅.`)
};

const zh_hant1_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 日誌。`)
};

const de_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logging für Java.`)
};

const fr_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Journalisation Java.`)
};

const uk_docsclisummaryjavajavalogging5 = /** @type {(inputs: Docsclisummaryjavajavalogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Журналювання в Java.`)
};

/**
* | output |
* | --- |
* | "Java logging." |
*
* @param {Docsclisummaryjavajavalogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavalogging5 = /** @type {((inputs?: Docsclisummaryjavajavalogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavalogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavalogging5(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavalogging5(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavalogging5(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavalogging5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavalogging5(inputs)
	if (locale === "de") return de_docsclisummaryjavajavalogging5(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavalogging5(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavalogging5(inputs)
	return en_docsclisummaryjavajavalogging5(inputs)
});
export { docsclisummaryjavajavalogging5 as "docsCliSummaryJavaJavaLogging" }