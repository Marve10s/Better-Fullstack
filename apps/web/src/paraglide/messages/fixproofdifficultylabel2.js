/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdifficultylabel2Inputs */

const en_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

const es_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

const zh_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

const ja_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

const ko_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

const zh_hant1_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

const de_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

const fr_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

const uk_fixproofdifficultylabel2 = /** @type {(inputs: Fixproofdifficultylabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty`)
};

/**
* | output |
* | --- |
* | "Difficulty" |
*
* @param {Fixproofdifficultylabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdifficultylabel2 = /** @type {((inputs?: Fixproofdifficultylabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdifficultylabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdifficultylabel2(inputs)
	if (locale === "zh") return zh_fixproofdifficultylabel2(inputs)
	if (locale === "ja") return ja_fixproofdifficultylabel2(inputs)
	if (locale === "ko") return ko_fixproofdifficultylabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdifficultylabel2(inputs)
	if (locale === "de") return de_fixproofdifficultylabel2(inputs)
	if (locale === "fr") return fr_fixproofdifficultylabel2(inputs)
	if (locale === "uk") return uk_fixproofdifficultylabel2(inputs)
	return en_fixproofdifficultylabel2(inputs)
});
export { fixproofdifficultylabel2 as "fixproofDifficultyLabel" }