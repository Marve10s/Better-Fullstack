/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustcli5Inputs */

const en_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust CLI tooling.`)
};

const es_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramientas CLI Rust.`)
};

const zh_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust CLI 工具。`)
};

const ja_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust の CLI ツール。`)
};

const ko_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust CLI 도구.`)
};

const zh_hant1_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust CLI 工具。`)
};

const de_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI-Werkzeuge für Rust.`)
};

const fr_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outils CLI Rust.`)
};

const uk_docsclisummaryrustrustcli5 = /** @type {(inputs: Docsclisummaryrustrustcli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інструменти CLI для Rust.`)
};

/**
* | output |
* | --- |
* | "Rust CLI tooling." |
*
* @param {Docsclisummaryrustrustcli5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustcli5 = /** @type {((inputs?: Docsclisummaryrustrustcli5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustcli5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustcli5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustcli5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustcli5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustcli5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustcli5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustcli5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustcli5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustcli5(inputs)
	return en_docsclisummaryrustrustcli5(inputs)
});
export { docsclisummaryrustrustcli5 as "docsCliSummaryRustRustCli" }