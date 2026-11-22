/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogovalidation5Inputs */



/**
* | output |
* | --- |
* | "Go validation." |
*
* @param {Docsclisummarygogovalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogovalidation5 = /** @type {((inputs?: Docsclisummarygogovalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogovalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Validación en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 校验。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のバリデーション。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 검증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Validierung für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Validation Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Валідація в Go.")
	return /** @type {LocalizedString} */ ("Go validation.")
});
export { docsclisummarygogovalidation5 as "docsCliSummaryGoGoValidation" }