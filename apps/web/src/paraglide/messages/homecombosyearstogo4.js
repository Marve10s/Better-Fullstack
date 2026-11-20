/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombosyearstogo4Inputs */



/**
* | output |
* | --- |
* | "years to go" |
*
* @param {Homecombosyearstogo4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombosyearstogo4 = /** @type {((inputs?: Homecombosyearstogo4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombosyearstogo4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("años por delante")
	if (locale === "zh") return /** @type {LocalizedString} */ ("年才能试完")
	if (locale === "ja") return /** @type {LocalizedString} */ ("年かかります")
	if (locale === "ko") return /** @type {LocalizedString} */ ("년 남음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("年才能試完")
	if (locale === "de") return /** @type {LocalizedString} */ ("Jahre noch")
	if (locale === "fr") return /** @type {LocalizedString} */ ("années restantes")
	if (locale === "uk") return /** @type {LocalizedString} */ ("років попереду")
	return /** @type {LocalizedString} */ ("years to go")
});
export { homecombosyearstogo4 as "homeCombosYearsToGo" }