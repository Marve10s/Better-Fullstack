/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoapi5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Capa API Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go API 层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go の API レイヤー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go API 계층.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go API 層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("API-Schicht für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Couche API Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шар API для Go.")
	return /** @type {LocalizedString} */ ("Go API layer.")
});
export { docsclisummarygogoapi5 as "docsCliSummaryGoGoApi" }