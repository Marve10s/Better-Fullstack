/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogallreleases2Inputs */



/**
* | output |
* | --- |
* | "All releases" |
*
* @param {Changelogallreleases2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogallreleases2 = /** @type {((inputs?: Changelogallreleases2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogallreleases2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Todas las versiones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("所有版本")
	if (locale === "ja") return /** @type {LocalizedString} */ ("すべてのリリース")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모든 릴리스")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("所有版本")
	if (locale === "de") return /** @type {LocalizedString} */ ("Alle Veröffentlichungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Toutes les versions")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Усі релізи")
	return /** @type {LocalizedString} */ ("All releases")
});
export { changelogallreleases2 as "changelogAllReleases" }