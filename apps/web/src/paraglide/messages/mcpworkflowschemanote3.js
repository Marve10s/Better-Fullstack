/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowschemanote3Inputs */

const en_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`valid options for the stack`)
};

const es_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`opciones válidas para el stack`)
};

const zh_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此 stack 的有效选项`)
};

const ja_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタックの有効なオプション`)
};

const ko_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택에 유효한 옵션`)
};

const zh_hant1_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此 stack 的有效選項`)
};

const de_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`gültige Optionen für den Stapel`)
};

const fr_mcpworkflowschemanote3 = /** @type {(inputs: Mcpworkflowschemanote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`options valides pour la pile`)
};

/**
* | output |
* | --- |
* | "valid options for the stack" |
*
* @param {Mcpworkflowschemanote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowschemanote3 = /** @type {((inputs?: Mcpworkflowschemanote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowschemanote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowschemanote3(inputs)
	if (locale === "es") return es_mcpworkflowschemanote3(inputs)
	if (locale === "zh") return zh_mcpworkflowschemanote3(inputs)
	if (locale === "ja") return ja_mcpworkflowschemanote3(inputs)
	if (locale === "ko") return ko_mcpworkflowschemanote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowschemanote3(inputs)
	if (locale === "de") return de_mcpworkflowschemanote3(inputs)
	return fr_mcpworkflowschemanote3(inputs)
});
export { mcpworkflowschemanote3 as "mcpWorkflowSchemaNote" }