/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowtitlea3Inputs */

const en_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`You describe.`)
};

const es_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tú describes.`)
};

const zh_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你来描述。`)
};

const ja_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`あなたは説明します。`)
};

const ko_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`당신은 설명합니다.`)
};

const zh_hant1_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你來描述。`)
};

const de_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Du beschreibst.`)
};

const fr_mcpworkflowtitlea3 = /** @type {(inputs: Mcpworkflowtitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vous décrivez.`)
};

/**
* | output |
* | --- |
* | "You describe." |
*
* @param {Mcpworkflowtitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowtitlea3 = /** @type {((inputs?: Mcpworkflowtitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowtitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowtitlea3(inputs)
	if (locale === "es") return es_mcpworkflowtitlea3(inputs)
	if (locale === "zh") return zh_mcpworkflowtitlea3(inputs)
	if (locale === "ja") return ja_mcpworkflowtitlea3(inputs)
	if (locale === "ko") return ko_mcpworkflowtitlea3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowtitlea3(inputs)
	if (locale === "de") return de_mcpworkflowtitlea3(inputs)
	return fr_mcpworkflowtitlea3(inputs)
});
export { mcpworkflowtitlea3 as "mcpWorkflowTitleA" }