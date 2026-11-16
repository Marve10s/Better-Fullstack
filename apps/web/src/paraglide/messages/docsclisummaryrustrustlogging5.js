/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustlogging5Inputs */



/**
* | output |
* | --- |
* | "Rust logging." |
*
* @param {Docsclisummaryrustrustlogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustlogging5 = /** @type {((inputs?: Docsclisummaryrustrustlogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustlogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Registro de eventos en Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 日志。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust のロギング。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 로깅.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 日誌。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Logging für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Journalisation Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Журналювання в Rust.")
	return /** @type {LocalizedString} */ ("Rust logging.")
});
export { docsclisummaryrustrustlogging5 as "docsCliSummaryRustRustLogging" }