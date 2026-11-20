/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphplogging5Inputs */



/**
* | output |
* | --- |
* | "PHP logging (framework-specific)." |
*
* @param {Docsclisummaryphpphplogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphplogging5 = /** @type {((inputs?: Docsclisummaryphpphplogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphplogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Registro de PHP (según el framework).")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP 日志（按框架区分）。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP のロギング（フレームワーク別）。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP 로깅(프레임워크별).")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP 日誌（依框架區分）。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-Logging (frameworkspezifisch).")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Journalisation PHP (propre au framework).")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Логування PHP (залежить від фреймворку).")
	return /** @type {LocalizedString} */ ("PHP logging (framework-specific).")
});
export { docsclisummaryphpphplogging5 as "docsCliSummaryPhpPhpLogging" }