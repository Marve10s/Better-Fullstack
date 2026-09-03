/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodtaskbody3Inputs */

const en_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const es_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const zh_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const ja_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const ko_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const zh_hant1_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const de_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const fr_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const uk_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

/**
* | output |
* | --- |
* | "A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that se..." |
*
* @param {Fixproofmethodtaskbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodtaskbody3 = /** @type {((inputs?: Fixproofmethodtaskbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodtaskbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodtaskbody3(inputs)
	if (locale === "zh") return zh_fixproofmethodtaskbody3(inputs)
	if (locale === "ja") return ja_fixproofmethodtaskbody3(inputs)
	if (locale === "ko") return ko_fixproofmethodtaskbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodtaskbody3(inputs)
	if (locale === "de") return de_fixproofmethodtaskbody3(inputs)
	if (locale === "fr") return fr_fixproofmethodtaskbody3(inputs)
	if (locale === "uk") return uk_fixproofmethodtaskbody3(inputs)
	return en_fixproofmethodtaskbody3(inputs)
});
export { fixproofmethodtaskbody3 as "fixproofMethodTaskBody" }