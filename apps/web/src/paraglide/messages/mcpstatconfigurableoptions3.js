/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatconfigurableoptions3Inputs */

const en_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`configurable options`)
};

const es_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`opciones configurables`)
};

const zh_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可配置选项`)
};

const ja_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`構成可能なオプション`)
};

const ko_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`구성 가능한 옵션`)
};

const zh_hant1_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可配置選項`)
};

const de_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`konfigurierbare Optionen`)
};

const fr_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`options configurables`)
};

const uk_mcpstatconfigurableoptions3 = /** @type {(inputs: Mcpstatconfigurableoptions3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`настроювані параметри`)
};

/**
* | output |
* | --- |
* | "configurable options" |
*
* @param {Mcpstatconfigurableoptions3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpstatconfigurableoptions3 = /** @type {((inputs?: Mcpstatconfigurableoptions3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatconfigurableoptions3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpstatconfigurableoptions3(inputs)
	if (locale === "es") return es_mcpstatconfigurableoptions3(inputs)
	if (locale === "zh") return zh_mcpstatconfigurableoptions3(inputs)
	if (locale === "ja") return ja_mcpstatconfigurableoptions3(inputs)
	if (locale === "ko") return ko_mcpstatconfigurableoptions3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpstatconfigurableoptions3(inputs)
	if (locale === "de") return de_mcpstatconfigurableoptions3(inputs)
	if (locale === "fr") return fr_mcpstatconfigurableoptions3(inputs)
	return uk_mcpstatconfigurableoptions3(inputs)
});
export { mcpstatconfigurableoptions3 as "mcpStatConfigurableOptions" }