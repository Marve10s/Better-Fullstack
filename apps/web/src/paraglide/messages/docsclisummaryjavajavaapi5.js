/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavaapi5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Capa API Java.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Java API 层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Java の API レイヤー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Java API 계층.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Java API 層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("API-Schicht für Java.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Couche API Java.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шар API для Java.")
	return /** @type {LocalizedString} */ ("Java API layer.")
});
export { docsclisummaryjavajavaapi5 as "docsCliSummaryJavaJavaApi" }