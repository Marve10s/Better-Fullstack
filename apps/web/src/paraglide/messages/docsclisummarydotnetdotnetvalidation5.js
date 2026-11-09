/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetvalidation5Inputs */



/**
* | output |
* | --- |
* | ".NET validation." |
*
* @param {Docsclisummarydotnetdotnetvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetvalidation5 = /** @type {((inputs?: Docsclisummarydotnetdotnetvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Validación en .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 校验。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のバリデーション。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 검증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Validierung für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Validation .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Валідація в .NET.")
	return /** @type {LocalizedString} */ (".NET validation.")
});
export { docsclisummarydotnetdotnetvalidation5 as "docsCliSummaryDotnetDotnetValidation" }