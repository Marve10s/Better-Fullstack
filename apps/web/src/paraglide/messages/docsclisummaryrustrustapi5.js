/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustapi5Inputs */

const en_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust API layer.`)
};

const es_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Capa API Rust.`)
};

const zh_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust API 层。`)
};

const ja_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust の API レイヤー。`)
};

const ko_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust API 계층.`)
};

const zh_hant1_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust API 層。`)
};

const de_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-Schicht für Rust.`)
};

const fr_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couche API Rust.`)
};

const uk_docsclisummaryrustrustapi5 = /** @type {(inputs: Docsclisummaryrustrustapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шар API для Rust.`)
};

/**
* | output |
* | --- |
* | "Rust API layer." |
*
* @param {Docsclisummaryrustrustapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustapi5 = /** @type {((inputs?: Docsclisummaryrustrustapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustapi5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustapi5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustapi5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustapi5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustapi5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustapi5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustapi5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustapi5(inputs)
	return en_docsclisummaryrustrustapi5(inputs)
});
export { docsclisummaryrustrustapi5 as "docsCliSummaryRustRustApi" }