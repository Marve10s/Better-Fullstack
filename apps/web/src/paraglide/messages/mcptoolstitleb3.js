/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolstitleb3Inputs */

const en_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One workflow.`)
};

const es_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un flujo.`)
};

const zh_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一个流程。`)
};

const ja_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ワークフローは 1 つ。`)
};

const ko_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`하나의 워크플로.`)
};

const zh_hant1_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一個流程。`)
};

const de_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein Arbeitsablauf.`)
};

const fr_mcptoolstitleb3 = /** @type {(inputs: Mcptoolstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un flux de travail.`)
};

/**
* | output |
* | --- |
* | "One workflow." |
*
* @param {Mcptoolstitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolstitleb3 = /** @type {((inputs?: Mcptoolstitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolstitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolstitleb3(inputs)
	if (locale === "es") return es_mcptoolstitleb3(inputs)
	if (locale === "zh") return zh_mcptoolstitleb3(inputs)
	if (locale === "ja") return ja_mcptoolstitleb3(inputs)
	if (locale === "ko") return ko_mcptoolstitleb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolstitleb3(inputs)
	if (locale === "de") return de_mcptoolstitleb3(inputs)
	return fr_mcptoolstitleb3(inputs)
});
export { mcptoolstitleb3 as "mcpToolsTitleB" }