/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep12Inputs */

const en_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const es_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const zh_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const ja_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const ko_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const zh_hant1_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const de_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const fr_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const uk_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

/**
* | output |
* | --- |
* | "The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away." |
*
* @param {Fixproofprovenancestep12Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep12 = /** @type {((inputs?: Fixproofprovenancestep12Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep12Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep12(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep12(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep12(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep12(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep12(inputs)
	if (locale === "de") return de_fixproofprovenancestep12(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep12(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep12(inputs)
	return en_fixproofprovenancestep12(inputs)
});
export { fixproofprovenancestep12 as "fixproofProvenanceStep1" }