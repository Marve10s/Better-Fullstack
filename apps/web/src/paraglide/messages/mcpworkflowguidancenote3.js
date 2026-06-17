/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowguidancenote3Inputs */

const en_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`workflow rules + field semantics`)
};

const es_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`reglas de flujo + semántica de campos`)
};

const zh_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作流规则 + 字段语义`)
};

const ja_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ワークフロー ルール + フィールド セマンティクス`)
};

const ko_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`워크플로 규칙 + 필드 의미`)
};

const zh_hant1_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作流程規則 + 欄位語義`)
};

const de_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workflow-Regeln + Feldsemantik`)
};

const fr_mcpworkflowguidancenote3 = /** @type {(inputs: Mcpworkflowguidancenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`règles de workflow + sémantique des champs`)
};

/**
* | output |
* | --- |
* | "workflow rules + field semantics" |
*
* @param {Mcpworkflowguidancenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowguidancenote3 = /** @type {((inputs?: Mcpworkflowguidancenote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowguidancenote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowguidancenote3(inputs)
	if (locale === "es") return es_mcpworkflowguidancenote3(inputs)
	if (locale === "zh") return zh_mcpworkflowguidancenote3(inputs)
	if (locale === "ja") return ja_mcpworkflowguidancenote3(inputs)
	if (locale === "ko") return ko_mcpworkflowguidancenote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowguidancenote3(inputs)
	if (locale === "de") return de_mcpworkflowguidancenote3(inputs)
	return fr_mcpworkflowguidancenote3(inputs)
});
export { mcpworkflowguidancenote3 as "mcpWorkflowGuidanceNote" }