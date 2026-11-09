/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogologging5Inputs */



/**
* | output |
* | --- |
* | "Go logging." |
*
* @param {Docsclisummarygogologging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogologging5 = /** @type {((inputs?: Docsclisummarygogologging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogologging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Registro de eventos en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 日志。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のロギング。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 로깅.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 日誌。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Logging für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Journalisation Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Журналювання в Go.")
	return /** @type {LocalizedString} */ ("Go logging.")
});
export { docsclisummarygogologging5 as "docsCliSummaryGoGoLogging" }