/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancepending2Inputs */

const en_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const es_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const zh_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const ja_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const ko_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const zh_hant1_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const de_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const fr_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const uk_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

/**
* | output |
* | --- |
* | "They are simply not run yet. They sit outside both indexes and outside the graded count." |
*
* @param {Fixproofprovenancepending2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancepending2 = /** @type {((inputs?: Fixproofprovenancepending2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancepending2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancepending2(inputs)
	if (locale === "zh") return zh_fixproofprovenancepending2(inputs)
	if (locale === "ja") return ja_fixproofprovenancepending2(inputs)
	if (locale === "ko") return ko_fixproofprovenancepending2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancepending2(inputs)
	if (locale === "de") return de_fixproofprovenancepending2(inputs)
	if (locale === "fr") return fr_fixproofprovenancepending2(inputs)
	if (locale === "uk") return uk_fixproofprovenancepending2(inputs)
	return en_fixproofprovenancepending2(inputs)
});
export { fixproofprovenancepending2 as "fixproofProvenancePending" }