/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancevalidation2Inputs */

const en_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const es_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const zh_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const ja_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const ko_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const zh_hant1_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const de_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const fr_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const uk_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

/**
* | output |
* | --- |
* | "Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it." |
*
* @param {Fixproofprovenancevalidation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancevalidation2 = /** @type {((inputs?: Fixproofprovenancevalidation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancevalidation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancevalidation2(inputs)
	if (locale === "zh") return zh_fixproofprovenancevalidation2(inputs)
	if (locale === "ja") return ja_fixproofprovenancevalidation2(inputs)
	if (locale === "ko") return ko_fixproofprovenancevalidation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancevalidation2(inputs)
	if (locale === "de") return de_fixproofprovenancevalidation2(inputs)
	if (locale === "fr") return fr_fixproofprovenancevalidation2(inputs)
	if (locale === "uk") return uk_fixproofprovenancevalidation2(inputs)
	return en_fixproofprovenancevalidation2(inputs)
});
export { fixproofprovenancevalidation2 as "fixproofProvenanceValidation" }