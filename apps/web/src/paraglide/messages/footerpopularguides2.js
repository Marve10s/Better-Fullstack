/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerpopularguides2Inputs */

const en_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Popular guides`)
};

const es_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guías populares`)
};

const zh_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`热门指南`)
};

const ja_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`人気のガイド`)
};

const ko_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`인기 가이드`)
};

const zh_hant1_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`熱門指南`)
};

const de_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Beliebte Reiseführer`)
};

const fr_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guides populaires`)
};

/**
* | output |
* | --- |
* | "Popular guides" |
*
* @param {Footerpopularguides2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const footerpopularguides2 = /** @type {((inputs?: Footerpopularguides2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerpopularguides2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footerpopularguides2(inputs)
	if (locale === "es") return es_footerpopularguides2(inputs)
	if (locale === "zh") return zh_footerpopularguides2(inputs)
	if (locale === "ja") return ja_footerpopularguides2(inputs)
	if (locale === "ko") return ko_footerpopularguides2(inputs)
	if (locale === "zh-Hant") return zh_hant1_footerpopularguides2(inputs)
	if (locale === "de") return de_footerpopularguides2(inputs)
	return fr_footerpopularguides2(inputs)
});
export { footerpopularguides2 as "footerPopularGuides" }