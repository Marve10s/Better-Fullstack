/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowcompatibilitynote3Inputs */

const en_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack validated, 0 adjustments`)
};

const es_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack validado, 0 ajustes`)
};

const zh_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack 已验证，0 项调整`)
};

const ja_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタックは検証済み、調整は0件`)
};

const ko_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택 검증됨, 조정 0개`)
};

const zh_hant1_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack 已驗證，0 項調整`)
};

const de_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stapel validiert, 0 Anpassungen`)
};

const fr_mcpworkflowcompatibilitynote3 = /** @type {(inputs: Mcpworkflowcompatibilitynote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`pile validée, 0 ajustements`)
};

/**
* | output |
* | --- |
* | "stack validated, 0 adjustments" |
*
* @param {Mcpworkflowcompatibilitynote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowcompatibilitynote3 = /** @type {((inputs?: Mcpworkflowcompatibilitynote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowcompatibilitynote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowcompatibilitynote3(inputs)
	if (locale === "es") return es_mcpworkflowcompatibilitynote3(inputs)
	if (locale === "zh") return zh_mcpworkflowcompatibilitynote3(inputs)
	if (locale === "ja") return ja_mcpworkflowcompatibilitynote3(inputs)
	if (locale === "ko") return ko_mcpworkflowcompatibilitynote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowcompatibilitynote3(inputs)
	if (locale === "de") return de_mcpworkflowcompatibilitynote3(inputs)
	return fr_mcpworkflowcompatibilitynote3(inputs)
});
export { mcpworkflowcompatibilitynote3 as "mcpWorkflowCompatibilityNote" }