/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolguidancedescription3Inputs */

const en_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workflow rules, field semantics, and critical constraints`)
};

const es_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reglas de flujo, semántica de campos y restricciones críticas`)
};

const zh_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作流规则、字段语义和关键约束`)
};

const ja_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ワークフロー ルール、フィールド セマンティクス、および重要な制約`)
};

const ko_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`워크플로 규칙, 필드 의미 및 중요 제약 조건`)
};

const zh_hant1_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作流程規則、欄位語意和關鍵約束`)
};

const de_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workflow-Regeln, Feldsemantik und kritische Einschränkungen`)
};

const fr_mcptoolguidancedescription3 = /** @type {(inputs: Mcptoolguidancedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Règles de workflow, sémantique des champs et contraintes critiques`)
};

/**
* | output |
* | --- |
* | "Workflow rules, field semantics, and critical constraints" |
*
* @param {Mcptoolguidancedescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolguidancedescription3 = /** @type {((inputs?: Mcptoolguidancedescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolguidancedescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolguidancedescription3(inputs)
	if (locale === "es") return es_mcptoolguidancedescription3(inputs)
	if (locale === "zh") return zh_mcptoolguidancedescription3(inputs)
	if (locale === "ja") return ja_mcptoolguidancedescription3(inputs)
	if (locale === "ko") return ko_mcptoolguidancedescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolguidancedescription3(inputs)
	if (locale === "de") return de_mcptoolguidancedescription3(inputs)
	return fr_mcptoolguidancedescription3(inputs)
});
export { mcptoolguidancedescription3 as "mcpToolGuidanceDescription" }