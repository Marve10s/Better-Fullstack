/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ minutes: NonNullable<unknown> }} Blogminread2Inputs */

const en_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.minutes} min read`)
};

const es_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.minutes} min de lectura`)
};

const zh_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`阅读约 ${i?.minutes} 分钟`)
};

const ja_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`読了目安 ${i?.minutes}分`)
};

const ko_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.minutes}분 소요`)
};

const zh_hant1_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`閱讀約 ${i?.minutes} 分鐘`)
};

const de_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.minutes} Min. Lesezeit`)
};

const fr_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.minutes} min de lecture`)
};

const uk_blogminread2 = /** @type {(inputs: Blogminread2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.minutes} хв читання`)
};

/**
* | output |
* | --- |
* | "{minutes} min read" |
*
* @param {Blogminread2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogminread2 = /** @type {((inputs: Blogminread2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogminread2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogminread2(inputs)
	if (locale === "es") return es_blogminread2(inputs)
	if (locale === "zh") return zh_blogminread2(inputs)
	if (locale === "ja") return ja_blogminread2(inputs)
	if (locale === "ko") return ko_blogminread2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogminread2(inputs)
	if (locale === "de") return de_blogminread2(inputs)
	if (locale === "fr") return fr_blogminread2(inputs)
	return uk_blogminread2(inputs)
});
export { blogminread2 as "blogMinRead" }