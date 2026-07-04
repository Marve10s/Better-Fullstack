/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatstructuredtools3Inputs */

const en_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`structured tools`)
};

const es_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`herramientas estructuradas`)
};

const zh_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结构化工具`)
};

const ja_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`構造化されたツール`)
};

const ko_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`구조화된 도구`)
};

const zh_hant1_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結構化工具`)
};

const de_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`strukturierte Werkzeuge`)
};

const fr_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`outils structurés`)
};

const uk_mcpstatstructuredtools3 = /** @type {(inputs: Mcpstatstructuredtools3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`структуровані інструменти`)
};

/**
* | output |
* | --- |
* | "structured tools" |
*
* @param {Mcpstatstructuredtools3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpstatstructuredtools3 = /** @type {((inputs?: Mcpstatstructuredtools3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatstructuredtools3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpstatstructuredtools3(inputs)
	if (locale === "es") return es_mcpstatstructuredtools3(inputs)
	if (locale === "zh") return zh_mcpstatstructuredtools3(inputs)
	if (locale === "ja") return ja_mcpstatstructuredtools3(inputs)
	if (locale === "ko") return ko_mcpstatstructuredtools3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpstatstructuredtools3(inputs)
	if (locale === "de") return de_mcpstatstructuredtools3(inputs)
	if (locale === "fr") return fr_mcpstatstructuredtools3(inputs)
	return uk_mcpstatstructuredtools3(inputs)
});
export { mcpstatstructuredtools3 as "mcpStatStructuredTools" }