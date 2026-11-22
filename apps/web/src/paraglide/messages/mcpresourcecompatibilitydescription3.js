/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourcecompatibilitydescription3Inputs */



/**
* | output |
* | --- |
* | "Which stack combinations are valid" |
*
* @param {Mcpresourcecompatibilitydescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpresourcecompatibilitydescription3 = /** @type {((inputs?: Mcpresourcecompatibilitydescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresourcecompatibilitydescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Qué combinaciones de stack son válidas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("哪些 stack 组合有效")
	if (locale === "ja") return /** @type {LocalizedString} */ ("有効なスタックの組み合わせはどれですか")
	if (locale === "ko") return /** @type {LocalizedString} */ ("유효한 스택 조합")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("哪些 stack 組合有效")
	if (locale === "de") return /** @type {LocalizedString} */ ("Welche Stapelkombinationen sind gültig?")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Quelles combinaisons de piles sont valides")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Які комбінації стеків дійсні")
	return /** @type {LocalizedString} */ ("Which stack combinations are valid")
});
export { mcpresourcecompatibilitydescription3 as "mcpResourceCompatibilityDescription" }