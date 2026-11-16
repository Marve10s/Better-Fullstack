/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowcompatibilitynote3Inputs */



/**
* | output |
* | --- |
* | "stack validated, 0 adjustments" |
*
* @param {Mcpworkflowcompatibilitynote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowcompatibilitynote3 = /** @type {((inputs?: Mcpworkflowcompatibilitynote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowcompatibilitynote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("stack validado, 0 ajustes")
	if (locale === "zh") return /** @type {LocalizedString} */ ("stack 已验证，0 项调整")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタックは検証済み、調整は0件")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택 검증됨, 조정 0개")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("stack 已驗證，0 項調整")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stack validiert, 0 Anpassungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("pile validée, 0 ajustements")
	if (locale === "uk") return /** @type {LocalizedString} */ ("стек перевірено, 0 коригувань")
	return /** @type {LocalizedString} */ ("stack validated, 0 adjustments")
});
export { mcpworkflowcompatibilitynote3 as "mcpWorkflowCompatibilityNote" }