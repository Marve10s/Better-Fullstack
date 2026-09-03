/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdeftestedits3Inputs */

const en_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const es_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const zh_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const ja_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const ko_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const zh_hant1_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const de_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const fr_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const uk_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

/**
* | output |
* | --- |
* | "Edits the agent made to test files. The harness reverts them before grading." |
*
* @param {Fixproofdeftestedits3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdeftestedits3 = /** @type {((inputs?: Fixproofdeftestedits3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdeftestedits3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdeftestedits3(inputs)
	if (locale === "zh") return zh_fixproofdeftestedits3(inputs)
	if (locale === "ja") return ja_fixproofdeftestedits3(inputs)
	if (locale === "ko") return ko_fixproofdeftestedits3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdeftestedits3(inputs)
	if (locale === "de") return de_fixproofdeftestedits3(inputs)
	if (locale === "fr") return fr_fixproofdeftestedits3(inputs)
	if (locale === "uk") return uk_fixproofdeftestedits3(inputs)
	return en_fixproofdeftestedits3(inputs)
});
export { fixproofdeftestedits3 as "fixproofDefTestEdits" }