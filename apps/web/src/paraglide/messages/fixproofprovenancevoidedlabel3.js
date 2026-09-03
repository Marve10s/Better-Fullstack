/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancevoidedlabel3Inputs */

const en_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

const es_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

const zh_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

const ja_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

const ko_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

const zh_hant1_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

const de_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

const fr_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

const uk_fixproofprovenancevoidedlabel3 = /** @type {(inputs: Fixproofprovenancevoidedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One run was voided`)
};

/**
* | output |
* | --- |
* | "One run was voided" |
*
* @param {Fixproofprovenancevoidedlabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancevoidedlabel3 = /** @type {((inputs?: Fixproofprovenancevoidedlabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancevoidedlabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancevoidedlabel3(inputs)
	if (locale === "zh") return zh_fixproofprovenancevoidedlabel3(inputs)
	if (locale === "ja") return ja_fixproofprovenancevoidedlabel3(inputs)
	if (locale === "ko") return ko_fixproofprovenancevoidedlabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancevoidedlabel3(inputs)
	if (locale === "de") return de_fixproofprovenancevoidedlabel3(inputs)
	if (locale === "fr") return fr_fixproofprovenancevoidedlabel3(inputs)
	if (locale === "uk") return uk_fixproofprovenancevoidedlabel3(inputs)
	return en_fixproofprovenancevoidedlabel3(inputs)
});
export { fixproofprovenancevoidedlabel3 as "fixproofProvenanceVoidedLabel" }