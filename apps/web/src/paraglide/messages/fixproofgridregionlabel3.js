/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofgridregionlabel3Inputs */

const en_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

const es_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

const zh_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

const ja_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

const ko_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

const zh_hant1_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

const de_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

const fr_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

const uk_fixproofgridregionlabel3 = /** @type {(inputs: Fixproofgridregionlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof task grid`)
};

/**
* | output |
* | --- |
* | "Fixproof task grid" |
*
* @param {Fixproofgridregionlabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofgridregionlabel3 = /** @type {((inputs?: Fixproofgridregionlabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofgridregionlabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofgridregionlabel3(inputs)
	if (locale === "zh") return zh_fixproofgridregionlabel3(inputs)
	if (locale === "ja") return ja_fixproofgridregionlabel3(inputs)
	if (locale === "ko") return ko_fixproofgridregionlabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofgridregionlabel3(inputs)
	if (locale === "de") return de_fixproofgridregionlabel3(inputs)
	if (locale === "fr") return fr_fixproofgridregionlabel3(inputs)
	if (locale === "uk") return uk_fixproofgridregionlabel3(inputs)
	return en_fixproofgridregionlabel3(inputs)
});
export { fixproofgridregionlabel3 as "fixproofGridRegionLabel" }