/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustcli5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramientas CLI Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust CLI 工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust の CLI ツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust CLI 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust CLI 工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("CLI-Werkzeuge für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outils CLI Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інструменти CLI для Rust.")
	return /** @type {LocalizedString} */ ("Rust CLI tooling.")
});
export { docsclisummaryrustrustcli5 as "docsCliSummaryRustRustCli" }