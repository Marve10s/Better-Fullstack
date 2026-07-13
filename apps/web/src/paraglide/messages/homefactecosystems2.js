/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystems: NonNullable<unknown> }} Homefactecosystems2Inputs */

const en_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Across ${i?.ecosystems}`)
};

const es_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`En ${i?.ecosystems}`)
};

const zh_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`覆盖 ${i?.ecosystems}`)
};

const ja_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems} 全体`)
};

const ko_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems} 전반에 걸쳐`)
};

const zh_hant1_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`覆蓋 ${i?.ecosystems}`)
};

const de_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Über ${i?.ecosystems}`)
};

const fr_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Dans ${i?.ecosystems}`)
};

const uk_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`У ${i?.ecosystems}`)
};

/**
* | output |
* | --- |
* | "Across {ecosystems}" |
*
* @param {Homefactecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homefactecosystems2 = /** @type {((inputs: Homefactecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactecosystems2(inputs)
	if (locale === "es") return es_homefactecosystems2(inputs)
	if (locale === "zh") return zh_homefactecosystems2(inputs)
	if (locale === "ja") return ja_homefactecosystems2(inputs)
	if (locale === "ko") return ko_homefactecosystems2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefactecosystems2(inputs)
	if (locale === "de") return de_homefactecosystems2(inputs)
	if (locale === "fr") return fr_homefactecosystems2(inputs)
	return uk_homefactecosystems2(inputs)
});
export { homefactecosystems2 as "homeFactEcosystems" }