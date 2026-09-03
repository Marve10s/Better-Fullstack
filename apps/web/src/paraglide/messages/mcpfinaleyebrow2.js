/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaleyebrow2Inputs */

const en_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const es_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const zh_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const ja_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const ko_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const zh_hant1_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const de_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const fr_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const uk_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

/**
* | output |
* | --- |
* | "Fixproof" |
*
* @param {Mcpfinaleyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpfinaleyebrow2 = /** @type {((inputs?: Mcpfinaleyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaleyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_mcpfinaleyebrow2(inputs)
	if (locale === "zh") return zh_mcpfinaleyebrow2(inputs)
	if (locale === "ja") return ja_mcpfinaleyebrow2(inputs)
	if (locale === "ko") return ko_mcpfinaleyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpfinaleyebrow2(inputs)
	if (locale === "de") return de_mcpfinaleyebrow2(inputs)
	if (locale === "fr") return fr_mcpfinaleyebrow2(inputs)
	if (locale === "uk") return uk_mcpfinaleyebrow2(inputs)
	return en_mcpfinaleyebrow2(inputs)
});
export { mcpfinaleyebrow2 as "mcpFinalEyebrow" }