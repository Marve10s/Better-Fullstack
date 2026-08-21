/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerlearn1Inputs */

const en_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Learn`)
};

const es_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aprender`)
};

const zh_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`学习`)
};

const ja_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`学ぶ`)
};

const ko_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`배우기`)
};

const zh_hant1_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`學習`)
};

const de_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lernen`)
};

const fr_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Apprendre`)
};

const uk_footerlearn1 = /** @type {(inputs: Footerlearn1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Навчання`)
};

/**
* | output |
* | --- |
* | "Learn" |
*
* @param {Footerlearn1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerlearn1 = /** @type {((inputs?: Footerlearn1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerlearn1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_footerlearn1(inputs)
	if (locale === "zh") return zh_footerlearn1(inputs)
	if (locale === "ja") return ja_footerlearn1(inputs)
	if (locale === "ko") return ko_footerlearn1(inputs)
	if (locale === "zh-Hant") return zh_hant1_footerlearn1(inputs)
	if (locale === "de") return de_footerlearn1(inputs)
	if (locale === "fr") return fr_footerlearn1(inputs)
	if (locale === "uk") return uk_footerlearn1(inputs)
	return en_footerlearn1(inputs)
});
export { footerlearn1 as "footerLearn" }