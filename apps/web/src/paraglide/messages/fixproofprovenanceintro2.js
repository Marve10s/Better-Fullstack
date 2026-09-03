/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenanceintro2Inputs */

const en_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const es_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const zh_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const ja_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const ko_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const zh_hant1_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const de_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const fr_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const uk_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

/**
* | output |
* | --- |
* | "Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated." |
*
* @param {Fixproofprovenanceintro2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenanceintro2 = /** @type {((inputs?: Fixproofprovenanceintro2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenanceintro2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenanceintro2(inputs)
	if (locale === "zh") return zh_fixproofprovenanceintro2(inputs)
	if (locale === "ja") return ja_fixproofprovenanceintro2(inputs)
	if (locale === "ko") return ko_fixproofprovenanceintro2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenanceintro2(inputs)
	if (locale === "de") return de_fixproofprovenanceintro2(inputs)
	if (locale === "fr") return fr_fixproofprovenanceintro2(inputs)
	if (locale === "uk") return uk_fixproofprovenanceintro2(inputs)
	return en_fixproofprovenanceintro2(inputs)
});
export { fixproofprovenanceintro2 as "fixproofProvenanceIntro" }