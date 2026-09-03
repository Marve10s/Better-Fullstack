/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofintro1Inputs */

const en_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const es_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const zh_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const ja_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const ko_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const zh_hant1_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const de_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const fr_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const uk_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

/**
* | output |
* | --- |
* | "Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, ..." |
*
* @param {Fixproofintro1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofintro1 = /** @type {((inputs?: Fixproofintro1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofintro1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofintro1(inputs)
	if (locale === "zh") return zh_fixproofintro1(inputs)
	if (locale === "ja") return ja_fixproofintro1(inputs)
	if (locale === "ko") return ko_fixproofintro1(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofintro1(inputs)
	if (locale === "de") return de_fixproofintro1(inputs)
	if (locale === "fr") return fr_fixproofintro1(inputs)
	if (locale === "uk") return uk_fixproofintro1(inputs)
	return en_fixproofintro1(inputs)
});
export { fixproofintro1 as "fixproofIntro" }