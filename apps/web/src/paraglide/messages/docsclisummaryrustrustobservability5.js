/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustobservability5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Observabilidad en Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 可观测性。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust のオブザーバビリティ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 관측성.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 可觀測性。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Observability für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Observabilité Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спостережуваність у Rust.")
	return /** @type {LocalizedString} */ ("Rust observability.")
});
export { docsclisummaryrustrustobservability5 as "docsCliSummaryRustRustObservability" }