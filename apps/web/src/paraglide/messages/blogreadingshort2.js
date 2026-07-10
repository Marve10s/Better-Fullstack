/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogreadingshort2Inputs */

const en_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Short`)
};

const es_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Corta`)
};

const zh_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`精简版`)
};

const ja_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ショート`)
};

const ko_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`짧게`)
};

const zh_hant1_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`精簡版`)
};

const de_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kurz`)
};

const fr_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Courte`)
};

const uk_blogreadingshort2 = /** @type {(inputs: Blogreadingshort2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Коротка`)
};

/**
* | output |
* | --- |
* | "Short" |
*
* @param {Blogreadingshort2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogreadingshort2 = /** @type {((inputs?: Blogreadingshort2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogreadingshort2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogreadingshort2(inputs)
	if (locale === "es") return es_blogreadingshort2(inputs)
	if (locale === "zh") return zh_blogreadingshort2(inputs)
	if (locale === "ja") return ja_blogreadingshort2(inputs)
	if (locale === "ko") return ko_blogreadingshort2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogreadingshort2(inputs)
	if (locale === "de") return de_blogreadingshort2(inputs)
	if (locale === "fr") return fr_blogreadingshort2(inputs)
	return uk_blogreadingshort2(inputs)
});
export { blogreadingshort2 as "blogReadingShort" }