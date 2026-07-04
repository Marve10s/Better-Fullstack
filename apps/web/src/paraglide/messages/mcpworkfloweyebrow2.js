/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkfloweyebrow2Inputs */

const en_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`workflow`)
};

const es_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`flujo`)
};

const zh_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`流程`)
};

const ja_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ワークフロー`)
};

const ko_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`작업 흐름`)
};

const zh_hant1_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`流程`)
};

const de_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Arbeitsablauf`)
};

const fr_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`flux de travail`)
};

const uk_mcpworkfloweyebrow2 = /** @type {(inputs: Mcpworkfloweyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`робочий процес`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkfloweyebrow2(inputs)
	if (locale === "es") return es_mcpworkfloweyebrow2(inputs)
	if (locale === "zh") return zh_mcpworkfloweyebrow2(inputs)
	if (locale === "ja") return ja_mcpworkfloweyebrow2(inputs)
	if (locale === "ko") return ko_mcpworkfloweyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkfloweyebrow2(inputs)
	if (locale === "de") return de_mcpworkfloweyebrow2(inputs)
	if (locale === "fr") return fr_mcpworkfloweyebrow2(inputs)
	return uk_mcpworkfloweyebrow2(inputs)
});
export { mcpworkfloweyebrow2 as "mcpWorkflowEyebrow" }