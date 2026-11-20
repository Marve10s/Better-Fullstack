/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoquality5Inputs */



/**
* | output |
* | --- |
* | "Go code quality." |
*
* @param {Docsclisummarygogoquality5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoquality5 = /** @type {((inputs?: Docsclisummarygogoquality5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoquality5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Calidad de código Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 代码质量。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のコード品質。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 코드 품질.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 程式碼品質。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Codequalität für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Qualité du code Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Якість коду Go.")
	return /** @type {LocalizedString} */ ("Go code quality.")
});
export { docsclisummarygogoquality5 as "docsCliSummaryGoGoQuality" }