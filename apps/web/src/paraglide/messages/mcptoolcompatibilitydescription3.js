/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolcompatibilitydescription3Inputs */

const en_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validate stack combinations with auto-adjustments`)
};

const es_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valida combinaciones de stack con autoajustes`)
};

const zh_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证 stack 组合并自动调整`)
};

const ja_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自動調整によるスタックの組み合わせの検証`)
};

const ko_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`자동 조정으로 스택 조합 검증`)
};

const zh_hant1_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`驗證 stack 組合並自動調整`)
};

const de_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validieren Sie Stapelkombinationen mit automatischen Anpassungen`)
};

const fr_mcptoolcompatibilitydescription3 = /** @type {(inputs: Mcptoolcompatibilitydescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validez les combinaisons de piles avec des ajustements automatiques`)
};

/**
* | output |
* | --- |
* | "Validate stack combinations with auto-adjustments" |
*
* @param {Mcptoolcompatibilitydescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolcompatibilitydescription3 = /** @type {((inputs?: Mcptoolcompatibilitydescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolcompatibilitydescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolcompatibilitydescription3(inputs)
	if (locale === "es") return es_mcptoolcompatibilitydescription3(inputs)
	if (locale === "zh") return zh_mcptoolcompatibilitydescription3(inputs)
	if (locale === "ja") return ja_mcptoolcompatibilitydescription3(inputs)
	if (locale === "ko") return ko_mcptoolcompatibilitydescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolcompatibilitydescription3(inputs)
	if (locale === "de") return de_mcptoolcompatibilitydescription3(inputs)
	return fr_mcptoolcompatibilitydescription3(inputs)
});
export { mcptoolcompatibilitydescription3 as "mcpToolCompatibilityDescription" }