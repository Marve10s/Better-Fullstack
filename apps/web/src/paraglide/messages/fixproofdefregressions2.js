/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefregressions2Inputs */

const en_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const es_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const zh_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const ja_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const ko_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const zh_hant1_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const de_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const fr_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const uk_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

/**
* | output |
* | --- |
* | "Graded runs where the package's existing test suite stopped passing." |
*
* @param {Fixproofdefregressions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefregressions2 = /** @type {((inputs?: Fixproofdefregressions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefregressions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefregressions2(inputs)
	if (locale === "zh") return zh_fixproofdefregressions2(inputs)
	if (locale === "ja") return ja_fixproofdefregressions2(inputs)
	if (locale === "ko") return ko_fixproofdefregressions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefregressions2(inputs)
	if (locale === "de") return de_fixproofdefregressions2(inputs)
	if (locale === "fr") return fr_fixproofdefregressions2(inputs)
	if (locale === "uk") return uk_fixproofdefregressions2(inputs)
	return en_fixproofdefregressions2(inputs)
});
export { fixproofdefregressions2 as "fixproofDefRegressions" }