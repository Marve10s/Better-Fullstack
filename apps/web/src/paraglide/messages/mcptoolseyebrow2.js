/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolseyebrow2Inputs */

const en_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`toolbox`)
};

const es_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`herramientas`)
};

const zh_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工具箱`)
};

const ja_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ツールボックス`)
};

const ko_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`도구 상자`)
};

const zh_hant1_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工具箱`)
};

const de_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Werkzeugkasten`)
};

const fr_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`boîte à outils`)
};

/**
* | output |
* | --- |
* | "toolbox" |
*
* @param {Mcptoolseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolseyebrow2 = /** @type {((inputs?: Mcptoolseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolseyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolseyebrow2(inputs)
	if (locale === "es") return es_mcptoolseyebrow2(inputs)
	if (locale === "zh") return zh_mcptoolseyebrow2(inputs)
	if (locale === "ja") return ja_mcptoolseyebrow2(inputs)
	if (locale === "ko") return ko_mcptoolseyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolseyebrow2(inputs)
	if (locale === "de") return de_mcptoolseyebrow2(inputs)
	return fr_mcptoolseyebrow2(inputs)
});
export { mcptoolseyebrow2 as "mcpToolsEyebrow" }