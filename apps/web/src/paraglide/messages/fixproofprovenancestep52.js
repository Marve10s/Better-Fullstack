/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep52Inputs */

const en_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const es_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const zh_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const ja_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const ko_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const zh_hant1_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const de_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const fr_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const uk_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

/**
* | output |
* | --- |
* | "The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time." |
*
* @param {Fixproofprovenancestep52Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep52 = /** @type {((inputs?: Fixproofprovenancestep52Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep52Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep52(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep52(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep52(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep52(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep52(inputs)
	if (locale === "de") return de_fixproofprovenancestep52(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep52(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep52(inputs)
	return en_fixproofprovenancestep52(inputs)
});
export { fixproofprovenancestep52 as "fixproofProvenanceStep5" }