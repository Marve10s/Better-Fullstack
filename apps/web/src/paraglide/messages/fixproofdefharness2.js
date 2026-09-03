/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefharness2Inputs */

const en_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const es_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const zh_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const ja_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const ko_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const zh_hant1_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const de_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const fr_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const uk_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

/**
* | output |
* | --- |
* | "The agent CLI that drove the model." |
*
* @param {Fixproofdefharness2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefharness2 = /** @type {((inputs?: Fixproofdefharness2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefharness2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefharness2(inputs)
	if (locale === "zh") return zh_fixproofdefharness2(inputs)
	if (locale === "ja") return ja_fixproofdefharness2(inputs)
	if (locale === "ko") return ko_fixproofdefharness2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefharness2(inputs)
	if (locale === "de") return de_fixproofdefharness2(inputs)
	if (locale === "fr") return fr_fixproofdefharness2(inputs)
	if (locale === "uk") return uk_fixproofdefharness2(inputs)
	return en_fixproofdefharness2(inputs)
});
export { fixproofdefharness2 as "fixproofDefHarness" }