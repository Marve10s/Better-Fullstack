/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navlanguage1Inputs */



/**
* | output |
* | --- |
* | "Language" |
*
* @param {Navlanguage1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navlanguage1 = /** @type {((inputs?: Navlanguage1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navlanguage1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Idioma")
	if (locale === "zh") return /** @type {LocalizedString} */ ("语言")
	if (locale === "ja") return /** @type {LocalizedString} */ ("言語")
	if (locale === "ko") return /** @type {LocalizedString} */ ("언어")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("語言")
	if (locale === "de") return /** @type {LocalizedString} */ ("Sprache")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Langue")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Мова")
	return /** @type {LocalizedString} */ ("Language")
});
export { navlanguage1 as "navLanguage" }