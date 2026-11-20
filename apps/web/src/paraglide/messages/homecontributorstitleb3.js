/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorstitleb3Inputs */



/**
* | output |
* | --- |
* | "By the community." |
*
* @param {Homecontributorstitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecontributorstitleb3 = /** @type {((inputs?: Homecontributorstitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorstitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Por la comunidad.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("社区共建。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コミュニティによって。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("커뮤니티에 의해.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("社群共建。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Von der Community.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Par la communauté.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Разом зі спільнотою.")
	return /** @type {LocalizedString} */ ("By the community.")
});
export { homecontributorstitleb3 as "homeContributorsTitleB" }