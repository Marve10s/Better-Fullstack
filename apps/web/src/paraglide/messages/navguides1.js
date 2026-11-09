/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navguides1Inputs */



/**
* | output |
* | --- |
* | "Guides" |
*
* @param {Navguides1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navguides1 = /** @type {((inputs?: Navguides1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navguides1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guías")
	if (locale === "zh") return /** @type {LocalizedString} */ ("指南")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ガイド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("가이드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("指南")
	if (locale === "de") return /** @type {LocalizedString} */ ("Guides")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Guides")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Гайди")
	return /** @type {LocalizedString} */ ("Guides")
});
export { navguides1 as "navGuides" }