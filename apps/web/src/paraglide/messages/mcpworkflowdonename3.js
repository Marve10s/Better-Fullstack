/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowdonename3Inputs */

const en_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`scaffold complete`)
};

const es_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`scaffold completado`)
};

const zh_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`scaffold 完成`)
};

const ja_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`足場が完成しました`)
};

const ko_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`비계 완성`)
};

const zh_hant1_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`scaffold 完成`)
};

const de_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gerüst fertig`)
};

const fr_mcpworkflowdonename3 = /** @type {(inputs: Mcpworkflowdonename3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`échafaudage terminé`)
};

/**
* | output |
* | --- |
* | "scaffold complete" |
*
* @param {Mcpworkflowdonename3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowdonename3 = /** @type {((inputs?: Mcpworkflowdonename3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowdonename3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowdonename3(inputs)
	if (locale === "es") return es_mcpworkflowdonename3(inputs)
	if (locale === "zh") return zh_mcpworkflowdonename3(inputs)
	if (locale === "ja") return ja_mcpworkflowdonename3(inputs)
	if (locale === "ko") return ko_mcpworkflowdonename3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowdonename3(inputs)
	if (locale === "de") return de_mcpworkflowdonename3(inputs)
	return fr_mcpworkflowdonename3(inputs)
});
export { mcpworkflowdonename3 as "mcpWorkflowDoneName" }