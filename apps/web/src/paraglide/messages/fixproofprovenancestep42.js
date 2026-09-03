/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep42Inputs */

const en_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const es_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const zh_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const ja_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const ko_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const zh_hant1_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const de_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const fr_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const uk_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

/**
* | output |
* | --- |
* | "The hidden tests are copied in and run, together with the package's existing suite." |
*
* @param {Fixproofprovenancestep42Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep42 = /** @type {((inputs?: Fixproofprovenancestep42Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep42Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep42(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep42(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep42(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep42(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep42(inputs)
	if (locale === "de") return de_fixproofprovenancestep42(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep42(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep42(inputs)
	return en_fixproofprovenancestep42(inputs)
});
export { fixproofprovenancestep42 as "fixproofProvenanceStep4" }