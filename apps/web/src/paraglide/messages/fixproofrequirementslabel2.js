/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofrequirementslabel2Inputs */

const en_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Requirements`)
};

const es_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Requisitos`)
};

const zh_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`需求`)
};

const ja_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要件`)
};

const ko_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`요구사항`)
};

const zh_hant1_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`需求`)
};

const de_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anforderungen`)
};

const fr_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exigences`)
};

const uk_fixproofrequirementslabel2 = /** @type {(inputs: Fixproofrequirementslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вимоги`)
};

/**
* | output |
* | --- |
* | "Requirements" |
*
* @param {Fixproofrequirementslabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofrequirementslabel2 = /** @type {((inputs?: Fixproofrequirementslabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofrequirementslabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofrequirementslabel2(inputs)
	if (locale === "zh") return zh_fixproofrequirementslabel2(inputs)
	if (locale === "ja") return ja_fixproofrequirementslabel2(inputs)
	if (locale === "ko") return ko_fixproofrequirementslabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofrequirementslabel2(inputs)
	if (locale === "de") return de_fixproofrequirementslabel2(inputs)
	if (locale === "fr") return fr_fixproofrequirementslabel2(inputs)
	if (locale === "uk") return uk_fixproofrequirementslabel2(inputs)
	return en_fixproofrequirementslabel2(inputs)
});
export { fixproofrequirementslabel2 as "fixproofRequirementsLabel" }