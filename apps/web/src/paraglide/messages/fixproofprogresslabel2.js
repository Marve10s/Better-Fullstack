/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprogresslabel2Inputs */

const en_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

const es_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

const zh_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

const ja_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

const ko_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

const zh_hant1_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

const de_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

const fr_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

const uk_fixproofprogresslabel2 = /** @type {(inputs: Fixproofprogresslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progress`)
};

/**
* | output |
* | --- |
* | "Progress" |
*
* @param {Fixproofprogresslabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprogresslabel2 = /** @type {((inputs?: Fixproofprogresslabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprogresslabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprogresslabel2(inputs)
	if (locale === "zh") return zh_fixproofprogresslabel2(inputs)
	if (locale === "ja") return ja_fixproofprogresslabel2(inputs)
	if (locale === "ko") return ko_fixproofprogresslabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprogresslabel2(inputs)
	if (locale === "de") return de_fixproofprogresslabel2(inputs)
	if (locale === "fr") return fr_fixproofprogresslabel2(inputs)
	if (locale === "uk") return uk_fixproofprogresslabel2(inputs)
	return en_fixproofprogresslabel2(inputs)
});
export { fixproofprogresslabel2 as "fixproofProgressLabel" }