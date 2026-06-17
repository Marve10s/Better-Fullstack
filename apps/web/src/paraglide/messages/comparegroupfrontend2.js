/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupfrontend2Inputs */

const en_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend`)
};

const es_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend`)
};

const zh_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前端`)
};

const ja_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フロントエンド`)
};

const ko_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프런트엔드`)
};

const zh_hant1_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前端`)
};

const de_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend`)
};

const fr_comparegroupfrontend2 = /** @type {(inputs: Comparegroupfrontend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`L'extrémité avant`)
};

/**
* | output |
* | --- |
* | "Frontend" |
*
* @param {Comparegroupfrontend2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparegroupfrontend2 = /** @type {((inputs?: Comparegroupfrontend2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupfrontend2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupfrontend2(inputs)
	if (locale === "es") return es_comparegroupfrontend2(inputs)
	if (locale === "zh") return zh_comparegroupfrontend2(inputs)
	if (locale === "ja") return ja_comparegroupfrontend2(inputs)
	if (locale === "ko") return ko_comparegroupfrontend2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparegroupfrontend2(inputs)
	if (locale === "de") return de_comparegroupfrontend2(inputs)
	return fr_comparegroupfrontend2(inputs)
});
export { comparegroupfrontend2 as "compareGroupFrontend" }