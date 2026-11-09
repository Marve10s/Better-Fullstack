/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkfloweyebrow2Inputs */



/**
* | output |
* | --- |
* | "workflow" |
*
* @param {Mcpworkfloweyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkfloweyebrow2 = /** @type {((inputs?: Mcpworkfloweyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkfloweyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("flujo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("流程")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ワークフロー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("작업 흐름")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("流程")
	if (locale === "de") return /** @type {LocalizedString} */ ("Arbeitsablauf")
	if (locale === "fr") return /** @type {LocalizedString} */ ("flux de travail")
	if (locale === "uk") return /** @type {LocalizedString} */ ("робочий процес")
	return /** @type {LocalizedString} */ ("workflow")
});
export { mcpworkfloweyebrow2 as "mcpWorkflowEyebrow" }