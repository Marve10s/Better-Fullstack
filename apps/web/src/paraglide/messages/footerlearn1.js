/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerlearn1Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aprender")
	if (locale === "zh") return /** @type {LocalizedString} */ ("学习")
	if (locale === "ja") return /** @type {LocalizedString} */ ("学ぶ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("배우기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("學習")
	if (locale === "de") return /** @type {LocalizedString} */ ("Lernen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Apprendre")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Навчання")
	return /** @type {LocalizedString} */ ("Learn")
});
export { footerlearn1 as "footerLearn" }