/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcoltestedits3Inputs */

const en_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

const es_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

const zh_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

const ja_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

const ko_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

const zh_hant1_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

const de_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

const fr_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

const uk_fixproofcoltestedits3 = /** @type {(inputs: Fixproofcoltestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test edits reverted`)
};

/**
* | output |
* | --- |
* | "Test edits reverted" |
*
* @param {Fixproofcoltestedits3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcoltestedits3 = /** @type {((inputs?: Fixproofcoltestedits3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcoltestedits3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcoltestedits3(inputs)
	if (locale === "zh") return zh_fixproofcoltestedits3(inputs)
	if (locale === "ja") return ja_fixproofcoltestedits3(inputs)
	if (locale === "ko") return ko_fixproofcoltestedits3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcoltestedits3(inputs)
	if (locale === "de") return de_fixproofcoltestedits3(inputs)
	if (locale === "fr") return fr_fixproofcoltestedits3(inputs)
	if (locale === "uk") return uk_fixproofcoltestedits3(inputs)
	return en_fixproofcoltestedits3(inputs)
});
export { fixproofcoltestedits3 as "fixproofColTestEdits" }