/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowtitleb3Inputs */

const en_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`It builds.`)
};

const es_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Él construye.`)
};

const zh_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`它来构建。`)
};

const ja_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`それは構築されます。`)
};

const ko_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌드됩니다.`)
};

const zh_hant1_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`它來構建。`)
};

const de_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Es baut.`)
};

const fr_mcpworkflowtitleb3 = /** @type {(inputs: Mcpworkflowtitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cela construit.`)
};

/**
* | output |
* | --- |
* | "It builds." |
*
* @param {Mcpworkflowtitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowtitleb3 = /** @type {((inputs?: Mcpworkflowtitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowtitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowtitleb3(inputs)
	if (locale === "es") return es_mcpworkflowtitleb3(inputs)
	if (locale === "zh") return zh_mcpworkflowtitleb3(inputs)
	if (locale === "ja") return ja_mcpworkflowtitleb3(inputs)
	if (locale === "ko") return ko_mcpworkflowtitleb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowtitleb3(inputs)
	if (locale === "de") return de_mcpworkflowtitleb3(inputs)
	return fr_mcpworkflowtitleb3(inputs)
});
export { mcpworkflowtitleb3 as "mcpWorkflowTitleB" }