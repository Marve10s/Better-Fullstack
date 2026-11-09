/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowschemanote3Inputs */



/**
* | output |
* | --- |
* | "valid options for the stack" |
*
* @param {Mcpworkflowschemanote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowschemanote3 = /** @type {((inputs?: Mcpworkflowschemanote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowschemanote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("opciones válidas para el stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("此 stack 的有效选项")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタックの有効なオプション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택에 유효한 옵션")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("此 stack 的有效選項")
	if (locale === "de") return /** @type {LocalizedString} */ ("gültige Optionen für den Stack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("options valides pour la pile")
	if (locale === "uk") return /** @type {LocalizedString} */ ("допустимі параметри для стека")
	return /** @type {LocalizedString} */ ("valid options for the stack")
});
export { mcpworkflowschemanote3 as "mcpWorkflowSchemaNote" }