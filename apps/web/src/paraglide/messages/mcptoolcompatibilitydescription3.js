/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolcompatibilitydescription3Inputs */



/**
* | output |
* | --- |
* | "Validate stack combinations with auto-adjustments" |
*
* @param {Mcptoolcompatibilitydescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolcompatibilitydescription3 = /** @type {((inputs?: Mcptoolcompatibilitydescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolcompatibilitydescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Valida combinaciones de stack con autoajustes")
	if (locale === "zh") return /** @type {LocalizedString} */ ("验证 stack 组合并自动调整")
	if (locale === "ja") return /** @type {LocalizedString} */ ("自動調整によるスタックの組み合わせの検証")
	if (locale === "ko") return /** @type {LocalizedString} */ ("자동 조정으로 스택 조합 검증")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("驗證 stack 組合並自動調整")
	if (locale === "de") return /** @type {LocalizedString} */ ("Validieren Sie Stack-Kombinationen mit automatischen Anpassungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Validez les combinaisons de piles avec des ajustements automatiques")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевірте комбінації стеків з автоматичними коригуваннями")
	return /** @type {LocalizedString} */ ("Validate stack combinations with auto-adjustments")
});
export { mcptoolcompatibilitydescription3 as "mcpToolCompatibilityDescription" }