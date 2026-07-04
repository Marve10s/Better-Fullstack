/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeyears1Inputs */

const en_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`years`)
};

const es_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`años`)
};

const zh_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`年`)
};

const ja_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`年`)
};

const ko_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`연령`)
};

const zh_hant1_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`年`)
};

const de_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jahre`)
};

const fr_homeyears1 = /** @type {(inputs: Homeyears1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`années`)
};

/**
* | output |
* | --- |
* | "years" |
*
* @param {Homeyears1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homeyears1 = /** @type {((inputs?: Homeyears1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeyears1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeyears1(inputs)
	if (locale === "es") return es_homeyears1(inputs)
	if (locale === "zh") return zh_homeyears1(inputs)
	if (locale === "ja") return ja_homeyears1(inputs)
	if (locale === "ko") return ko_homeyears1(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeyears1(inputs)
	if (locale === "de") return de_homeyears1(inputs)
	return fr_homeyears1(inputs)
});
export { homeyears1 as "homeYears" }