/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowguidancenote3Inputs */



/**
* | output |
* | --- |
* | "workflow rules + field semantics" |
*
* @param {Mcpworkflowguidancenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowguidancenote3 = /** @type {((inputs?: Mcpworkflowguidancenote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowguidancenote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("reglas de flujo + semántica de campos")
	if (locale === "zh") return /** @type {LocalizedString} */ ("工作流规则 + 字段语义")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ワークフロー ルール + フィールド セマンティクス")
	if (locale === "ko") return /** @type {LocalizedString} */ ("워크플로 규칙 + 필드 의미")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("工作流程規則 + 欄位語義")
	if (locale === "de") return /** @type {LocalizedString} */ ("Workflow-Regeln + Feldsemantik")
	if (locale === "fr") return /** @type {LocalizedString} */ ("règles de workflow + sémantique des champs")
	if (locale === "uk") return /** @type {LocalizedString} */ ("правила робочого процесу + семантика поля")
	return /** @type {LocalizedString} */ ("workflow rules + field semantics")
});
export { mcpworkflowguidancenote3 as "mcpWorkflowGuidanceNote" }