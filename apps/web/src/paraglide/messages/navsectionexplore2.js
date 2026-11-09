/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsectionexplore2Inputs */



/**
* | output |
* | --- |
* | "Explore" |
*
* @param {Navsectionexplore2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navsectionexplore2 = /** @type {((inputs?: Navsectionexplore2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsectionexplore2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Explorar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("探索")
	if (locale === "ja") return /** @type {LocalizedString} */ ("探索")
	if (locale === "ko") return /** @type {LocalizedString} */ ("둘러보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("探索")
	if (locale === "de") return /** @type {LocalizedString} */ ("Entdecken")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Explorer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Огляд")
	return /** @type {LocalizedString} */ ("Explore")
});
export { navsectionexplore2 as "navSectionExplore" }