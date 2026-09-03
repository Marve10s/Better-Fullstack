/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdurationlabel2Inputs */

const en_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

const es_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

const zh_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

const ja_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

const ko_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

const zh_hant1_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

const de_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

const fr_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

const uk_fixproofdurationlabel2 = /** @type {(inputs: Fixproofdurationlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent time`)
};

/**
* | output |
* | --- |
* | "Agent time" |
*
* @param {Fixproofdurationlabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdurationlabel2 = /** @type {((inputs?: Fixproofdurationlabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdurationlabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdurationlabel2(inputs)
	if (locale === "zh") return zh_fixproofdurationlabel2(inputs)
	if (locale === "ja") return ja_fixproofdurationlabel2(inputs)
	if (locale === "ko") return ko_fixproofdurationlabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdurationlabel2(inputs)
	if (locale === "de") return de_fixproofdurationlabel2(inputs)
	if (locale === "fr") return fr_fixproofdurationlabel2(inputs)
	if (locale === "uk") return uk_fixproofdurationlabel2(inputs)
	return en_fixproofdurationlabel2(inputs)
});
export { fixproofdurationlabel2 as "fixproofDurationLabel" }