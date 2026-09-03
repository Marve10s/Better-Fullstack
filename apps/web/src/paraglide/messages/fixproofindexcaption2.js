/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofindexcaption2Inputs */

const en_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const es_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const zh_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const ja_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const ko_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const zh_hant1_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const de_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const fr_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const uk_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

/**
* | output |
* | --- |
* | "Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see." |
*
* @param {Fixproofindexcaption2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofindexcaption2 = /** @type {((inputs?: Fixproofindexcaption2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofindexcaption2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofindexcaption2(inputs)
	if (locale === "zh") return zh_fixproofindexcaption2(inputs)
	if (locale === "ja") return ja_fixproofindexcaption2(inputs)
	if (locale === "ko") return ko_fixproofindexcaption2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofindexcaption2(inputs)
	if (locale === "de") return de_fixproofindexcaption2(inputs)
	if (locale === "fr") return fr_fixproofindexcaption2(inputs)
	if (locale === "uk") return uk_fixproofindexcaption2(inputs)
	return en_fixproofindexcaption2(inputs)
});
export { fixproofindexcaption2 as "fixproofIndexCaption" }