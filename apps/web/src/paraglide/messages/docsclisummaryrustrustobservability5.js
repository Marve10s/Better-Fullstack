/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustobservability5Inputs */

const en_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust observability.`)
};

const es_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilidad en Rust.`)
};

const zh_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 可观测性。`)
};

const ja_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust のオブザーバビリティ。`)
};

const ko_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 관측성.`)
};

const zh_hant1_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 可觀測性。`)
};

const de_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observability für Rust.`)
};

const fr_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilité Rust.`)
};

const uk_docsclisummaryrustrustobservability5 = /** @type {(inputs: Docsclisummaryrustrustobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спостережуваність у Rust.`)
};

/**
* | output |
* | --- |
* | "Rust observability." |
*
* @param {Docsclisummaryrustrustobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustobservability5 = /** @type {((inputs?: Docsclisummaryrustrustobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustobservability5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustobservability5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustobservability5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustobservability5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustobservability5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustobservability5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustobservability5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustobservability5(inputs)
	return en_docsclisummaryrustrustobservability5(inputs)
});
export { docsclisummaryrustrustobservability5 as "docsCliSummaryRustRustObservability" }