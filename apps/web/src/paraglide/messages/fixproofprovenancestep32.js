/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep32Inputs */

const en_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const es_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const zh_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const ja_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const ko_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const zh_hant1_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const de_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const fr_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const uk_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

/**
* | output |
* | --- |
* | "When the agent stops, the harness reverts every edit it made to test files." |
*
* @param {Fixproofprovenancestep32Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep32 = /** @type {((inputs?: Fixproofprovenancestep32Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep32Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep32(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep32(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep32(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep32(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep32(inputs)
	if (locale === "de") return de_fixproofprovenancestep32(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep32(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep32(inputs)
	return en_fixproofprovenancestep32(inputs)
});
export { fixproofprovenancestep32 as "fixproofProvenanceStep3" }