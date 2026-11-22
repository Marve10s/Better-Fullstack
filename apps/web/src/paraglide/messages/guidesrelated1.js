/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Guidesrelated1Inputs */



/**
* | output |
* | --- |
* | "Related guides" |
*
* @param {Guidesrelated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const guidesrelated1 = /** @type {((inputs?: Guidesrelated1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Guidesrelated1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guías relacionadas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("相关指南")
	if (locale === "ja") return /** @type {LocalizedString} */ ("関連ガイド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("관련 가이드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("相關指南")
	if (locale === "de") return /** @type {LocalizedString} */ ("Verwandte Leitfäden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Guides associés")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Пов’язані гайди")
	return /** @type {LocalizedString} */ ("Related guides")
});
export { guidesrelated1 as "guidesRelated" }