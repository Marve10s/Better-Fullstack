/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolguidancedescription3Inputs */



/**
* | output |
* | --- |
* | "Workflow rules, field semantics, and critical constraints" |
*
* @param {Mcptoolguidancedescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolguidancedescription3 = /** @type {((inputs?: Mcptoolguidancedescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolguidancedescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Reglas de flujo, semántica de campos y restricciones críticas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("工作流规则、字段语义和关键约束")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ワークフロー ルール、フィールド セマンティクス、および重要な制約")
	if (locale === "ko") return /** @type {LocalizedString} */ ("워크플로 규칙, 필드 의미 및 중요 제약 조건")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("工作流程規則、欄位語意和關鍵約束")
	if (locale === "de") return /** @type {LocalizedString} */ ("Workflow-Regeln, Feldsemantik und kritische Einschränkungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Règles de workflow, sémantique des champs et contraintes critiques")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Правила workflow, семантика полів і критичні обмеження")
	return /** @type {LocalizedString} */ ("Workflow rules, field semantics, and critical constraints")
});
export { mcptoolguidancedescription3 as "mcpToolGuidanceDescription" }