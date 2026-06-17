/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombinatorics1Inputs */

const en_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`combinatorics`)
};

const es_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`combinatoria`)
};

const zh_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组合数量`)
};

const ja_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`組み合わせ論`)
};

const ko_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`조합론`)
};

const zh_hant1_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`組合數量`)
};

const de_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kombinatorik`)
};

const fr_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`combinatoire`)
};

/**
* | output |
* | --- |
* | "combinatorics" |
*
* @param {Homecombinatorics1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homecombinatorics1 = /** @type {((inputs?: Homecombinatorics1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombinatorics1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecombinatorics1(inputs)
	if (locale === "es") return es_homecombinatorics1(inputs)
	if (locale === "zh") return zh_homecombinatorics1(inputs)
	if (locale === "ja") return ja_homecombinatorics1(inputs)
	if (locale === "ko") return ko_homecombinatorics1(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecombinatorics1(inputs)
	if (locale === "de") return de_homecombinatorics1(inputs)
	return fr_homecombinatorics1(inputs)
});
export { homecombinatorics1 as "homeCombinatorics" }