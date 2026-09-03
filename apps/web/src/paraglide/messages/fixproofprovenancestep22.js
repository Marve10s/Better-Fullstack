/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep22Inputs */

const en_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const es_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const zh_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const ja_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const ko_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const zh_hant1_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const de_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const fr_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const uk_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

/**
* | output |
* | --- |
* | "The agent works unattended for up to 30 minutes with the symptom statement and the code." |
*
* @param {Fixproofprovenancestep22Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep22 = /** @type {((inputs?: Fixproofprovenancestep22Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep22Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep22(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep22(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep22(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep22(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep22(inputs)
	if (locale === "de") return de_fixproofprovenancestep22(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep22(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep22(inputs)
	return en_fixproofprovenancestep22(inputs)
});
export { fixproofprovenancestep22 as "fixproofProvenanceStep2" }