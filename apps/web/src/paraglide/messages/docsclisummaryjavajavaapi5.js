/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavaapi5Inputs */

const en_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API layer.`)
};

const es_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Capa API Java.`)
};

const zh_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API 层。`)
};

const ja_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java の API レイヤー。`)
};

const ko_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API 계층.`)
};

const zh_hant1_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API 層。`)
};

const de_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-Schicht für Java.`)
};

const fr_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couche API Java.`)
};

const uk_docsclisummaryjavajavaapi5 = /** @type {(inputs: Docsclisummaryjavajavaapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шар API для Java.`)
};

/**
* | output |
* | --- |
* | "Java API layer." |
*
* @param {Docsclisummaryjavajavaapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavaapi5 = /** @type {((inputs?: Docsclisummaryjavajavaapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavaapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavaapi5(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavaapi5(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavaapi5(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavaapi5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavaapi5(inputs)
	if (locale === "de") return de_docsclisummaryjavajavaapi5(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavaapi5(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavaapi5(inputs)
	return en_docsclisummaryjavajavaapi5(inputs)
});
export { docsclisummaryjavajavaapi5 as "docsCliSummaryJavaJavaApi" }