/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerpopularguides2Inputs */



/**
* | output |
* | --- |
* | "Popular guides" |
*
* @param {Footerpopularguides2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerpopularguides2 = /** @type {((inputs?: Footerpopularguides2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerpopularguides2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guías populares")
	if (locale === "zh") return /** @type {LocalizedString} */ ("热门指南")
	if (locale === "ja") return /** @type {LocalizedString} */ ("人気のガイド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("인기 가이드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("熱門指南")
	if (locale === "de") return /** @type {LocalizedString} */ ("Beliebte Leitfäden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Guides populaires")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Популярні гайди")
	return /** @type {LocalizedString} */ ("Popular guides")
});
export { footerpopularguides2 as "footerPopularGuides" }