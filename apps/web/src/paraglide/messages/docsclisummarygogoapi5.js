/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoapi5Inputs */

const en_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go API layer.`)
};

const es_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Capa API Go.`)
};

const zh_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go API 层。`)
};

const ja_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go の API レイヤー。`)
};

const ko_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go API 계층.`)
};

const zh_hant1_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go API 層。`)
};

const de_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-Schicht für Go.`)
};

const fr_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couche API Go.`)
};

const uk_docsclisummarygogoapi5 = /** @type {(inputs: Docsclisummarygogoapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шар API для Go.`)
};

/**
* | output |
* | --- |
* | "Go API layer." |
*
* @param {Docsclisummarygogoapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoapi5 = /** @type {((inputs?: Docsclisummarygogoapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogoapi5(inputs)
	if (locale === "zh") return zh_docsclisummarygogoapi5(inputs)
	if (locale === "ja") return ja_docsclisummarygogoapi5(inputs)
	if (locale === "ko") return ko_docsclisummarygogoapi5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogoapi5(inputs)
	if (locale === "de") return de_docsclisummarygogoapi5(inputs)
	if (locale === "fr") return fr_docsclisummarygogoapi5(inputs)
	if (locale === "uk") return uk_docsclisummarygogoapi5(inputs)
	return en_docsclisummarygogoapi5(inputs)
});
export { docsclisummarygogoapi5 as "docsCliSummaryGoGoApi" }