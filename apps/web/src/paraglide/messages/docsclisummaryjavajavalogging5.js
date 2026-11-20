/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavalogging5Inputs */



/**
* | output |
* | --- |
* | "Java logging." |
*
* @param {Docsclisummaryjavajavalogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavalogging5 = /** @type {((inputs?: Docsclisummaryjavajavalogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavalogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Registro de eventos en Java.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Java 日志。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Java のロギング。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Java 로깅.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Java 日誌。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Logging für Java.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Journalisation Java.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Журналювання в Java.")
	return /** @type {LocalizedString} */ ("Java logging.")
});
export { docsclisummaryjavajavalogging5 as "docsCliSummaryJavaJavaLogging" }