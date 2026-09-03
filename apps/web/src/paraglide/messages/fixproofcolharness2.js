/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolharness2Inputs */

const en_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness`)
};

const es_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness`)
};

const zh_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness`)
};

const ja_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ハーネス`)
};

const ko_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`하네스`)
};

const zh_hant1_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness`)
};

const de_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness`)
};

const fr_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness`)
};

const uk_fixproofcolharness2 = /** @type {(inputs: Fixproofcolharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness`)
};

/**
* | output |
* | --- |
* | "Harness" |
*
* @param {Fixproofcolharness2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolharness2 = /** @type {((inputs?: Fixproofcolharness2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolharness2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolharness2(inputs)
	if (locale === "zh") return zh_fixproofcolharness2(inputs)
	if (locale === "ja") return ja_fixproofcolharness2(inputs)
	if (locale === "ko") return ko_fixproofcolharness2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolharness2(inputs)
	if (locale === "de") return de_fixproofcolharness2(inputs)
	if (locale === "fr") return fr_fixproofcolharness2(inputs)
	if (locale === "uk") return uk_fixproofcolharness2(inputs)
	return en_fixproofcolharness2(inputs)
});
export { fixproofcolharness2 as "fixproofColHarness" }