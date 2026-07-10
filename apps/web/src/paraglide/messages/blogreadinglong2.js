/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogreadinglong2Inputs */

const en_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Long`)
};

const es_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Larga`)
};

const zh_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完整版`)
};

const ja_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ロング`)
};

const ko_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`길게`)
};

const zh_hant1_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完整版`)
};

const de_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lang`)
};

const fr_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Longue`)
};

const uk_blogreadinglong2 = /** @type {(inputs: Blogreadinglong2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Повна`)
};

/**
* | output |
* | --- |
* | "Long" |
*
* @param {Blogreadinglong2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogreadinglong2 = /** @type {((inputs?: Blogreadinglong2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogreadinglong2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogreadinglong2(inputs)
	if (locale === "es") return es_blogreadinglong2(inputs)
	if (locale === "zh") return zh_blogreadinglong2(inputs)
	if (locale === "ja") return ja_blogreadinglong2(inputs)
	if (locale === "ko") return ko_blogreadinglong2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogreadinglong2(inputs)
	if (locale === "de") return de_blogreadinglong2(inputs)
	if (locale === "fr") return fr_blogreadinglong2(inputs)
	return uk_blogreadinglong2(inputs)
});
export { blogreadinglong2 as "blogReadingLong" }