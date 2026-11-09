/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagesectionweb3Inputs */



/**
* | output |
* | --- |
* | "Web" |
*
* @param {Builderlanguagesectionweb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlanguagesectionweb3 = /** @type {((inputs?: Builderlanguagesectionweb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlanguagesectionweb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Web")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Web")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Web")
	if (locale === "ko") return /** @type {LocalizedString} */ ("웹")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Web")
	if (locale === "de") return /** @type {LocalizedString} */ ("Web")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Web")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Веб")
	return /** @type {LocalizedString} */ ("Web")
});
export { builderlanguagesectionweb3 as "builderLanguageSectionWeb" }