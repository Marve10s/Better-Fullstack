/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcoleffort2Inputs */

const en_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effort`)
};

const es_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Esfuerzo`)
};

const zh_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`推理强度`)
};

const ja_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`推論強度`)
};

const ko_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`추론 강도`)
};

const zh_hant1_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`推理強度`)
};

const de_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effort`)
};

const fr_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effort`)
};

const uk_fixproofcoleffort2 = /** @type {(inputs: Fixproofcoleffort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Рівень зусиль`)
};

/**
* | output |
* | --- |
* | "Effort" |
*
* @param {Fixproofcoleffort2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcoleffort2 = /** @type {((inputs?: Fixproofcoleffort2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcoleffort2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcoleffort2(inputs)
	if (locale === "zh") return zh_fixproofcoleffort2(inputs)
	if (locale === "ja") return ja_fixproofcoleffort2(inputs)
	if (locale === "ko") return ko_fixproofcoleffort2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcoleffort2(inputs)
	if (locale === "de") return de_fixproofcoleffort2(inputs)
	if (locale === "fr") return fr_fixproofcoleffort2(inputs)
	if (locale === "uk") return uk_fixproofcoleffort2(inputs)
	return en_fixproofcoleffort2(inputs)
});
export { fixproofcoleffort2 as "fixproofColEffort" }