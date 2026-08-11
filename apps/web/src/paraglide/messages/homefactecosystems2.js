/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystemNames: NonNullable<unknown> }} Homefactecosystems2Inputs */

const en_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Across ${i?.ecosystemNames}`)
};

const es_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`En ${i?.ecosystemNames}`)
};

const zh_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`覆盖 ${i?.ecosystemNames}`)
};

const ja_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames} 全体`)
};

const ko_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames} 전반에 걸쳐`)
};

const zh_hant1_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`覆蓋 ${i?.ecosystemNames}`)
};

const de_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Über ${i?.ecosystemNames}`)
};

const fr_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Sur ${i?.ecosystemNames}`)
};

const uk_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames}`)
};

/**
* | output |
* | --- |
* | "Across {ecosystemNames}" |
*
* @param {Homefactecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homefactecosystems2 = /** @type {((inputs: Homefactecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homefactecosystems2(inputs)
	if (locale === "zh") return zh_homefactecosystems2(inputs)
	if (locale === "ja") return ja_homefactecosystems2(inputs)
	if (locale === "ko") return ko_homefactecosystems2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefactecosystems2(inputs)
	if (locale === "de") return de_homefactecosystems2(inputs)
	if (locale === "fr") return fr_homefactecosystems2(inputs)
	if (locale === "uk") return uk_homefactecosystems2(inputs)
	return en_homefactecosystems2(inputs)
});
export { homefactecosystems2 as "homeFactEcosystems" }