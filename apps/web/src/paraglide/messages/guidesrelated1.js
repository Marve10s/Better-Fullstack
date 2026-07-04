/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Guidesrelated1Inputs */

const en_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Related guides`)
};

const es_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guías relacionadas`)
};

const zh_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`相关指南`)
};

const ja_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`関連ガイド`)
};

const ko_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`관련 가이드`)
};

const zh_hant1_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`相關指南`)
};

const de_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verwandte Leitfäden`)
};

const fr_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guides associés`)
};

/**
* | output |
* | --- |
* | "Related guides" |
*
* @param {Guidesrelated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const guidesrelated1 = /** @type {((inputs?: Guidesrelated1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Guidesrelated1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_guidesrelated1(inputs)
	if (locale === "es") return es_guidesrelated1(inputs)
	if (locale === "zh") return zh_guidesrelated1(inputs)
	if (locale === "ja") return ja_guidesrelated1(inputs)
	if (locale === "ko") return ko_guidesrelated1(inputs)
	if (locale === "zh-Hant") return zh_hant1_guidesrelated1(inputs)
	if (locale === "de") return de_guidesrelated1(inputs)
	return fr_guidesrelated1(inputs)
});
export { guidesrelated1 as "guidesRelated" }