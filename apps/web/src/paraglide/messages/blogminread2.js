/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ minutes: NonNullable<unknown> }} Blogminread2Inputs */



/**
* | output |
* | --- |
* | "{minutes} min read" |
*
* @param {Blogminread2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogminread2 = /** @type {((inputs: Blogminread2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogminread2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.minutes} min de lectura`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`阅读约 ${i?.minutes} 分钟`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`読了目安 ${i?.minutes}分`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.minutes}분 소요`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`閱讀約 ${i?.minutes} 分鐘`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.minutes} Min. Lesezeit`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.minutes} min de lecture`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.minutes} хв читання`)
	return /** @type {LocalizedString} */ (`${i?.minutes} min read`)
});
export { blogminread2 as "blogMinRead" }