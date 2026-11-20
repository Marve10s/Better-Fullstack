/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptserviceslogging5Inputs */



/**
* | output |
* | --- |
* | "Logging library." |
*
* @param {Docsclisummarytypescriptserviceslogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptserviceslogging5 = /** @type {((inputs?: Docsclisummarytypescriptserviceslogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptserviceslogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de registro de eventos.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("日志库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ロギングライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("로깅 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("日誌函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Logging-Bibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de journalisation.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека журналювання.")
	return /** @type {LocalizedString} */ ("Logging library.")
});
export { docsclisummarytypescriptserviceslogging5 as "docsCliSummaryTypescriptServicesLogging" }