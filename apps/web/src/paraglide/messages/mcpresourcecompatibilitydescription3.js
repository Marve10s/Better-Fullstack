/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourcecompatibilitydescription3Inputs */

const en_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Which stack combinations are valid`)
};

const es_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Qué combinaciones de stack son válidas`)
};

const zh_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`哪些 stack 组合有效`)
};

const ja_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`有効なスタックの組み合わせはどれですか`)
};

const ko_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`유효한 스택 조합`)
};

const zh_hant1_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`哪些 stack 組合有效`)
};

const de_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Welche Stapelkombinationen sind gültig?`)
};

const fr_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quelles combinaisons de piles sont valides`)
};

const uk_mcpresourcecompatibilitydescription3 = /** @type {(inputs: Mcpresourcecompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Які комбінації стеків дійсні`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpresourcecompatibilitydescription3(inputs)
	if (locale === "es") return es_mcpresourcecompatibilitydescription3(inputs)
	if (locale === "zh") return zh_mcpresourcecompatibilitydescription3(inputs)
	if (locale === "ja") return ja_mcpresourcecompatibilitydescription3(inputs)
	if (locale === "ko") return ko_mcpresourcecompatibilitydescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpresourcecompatibilitydescription3(inputs)
	if (locale === "de") return de_mcpresourcecompatibilitydescription3(inputs)
	if (locale === "fr") return fr_mcpresourcecompatibilitydescription3(inputs)
	return uk_mcpresourcecompatibilitydescription3(inputs)
});
export { mcpresourcecompatibilitydescription3 as "mcpResourceCompatibilityDescription" }