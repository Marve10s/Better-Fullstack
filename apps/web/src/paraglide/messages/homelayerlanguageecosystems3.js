/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerlanguageecosystems3Inputs */



/**
* | output |
* | --- |
* | "LANGUAGE ECOSYSTEMS" |
*
* @param {Homelayerlanguageecosystems3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelayerlanguageecosystems3 = /** @type {((inputs?: Homelayerlanguageecosystems3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerlanguageecosystems3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ECOSISTEMAS DE LENGUAJE")
	if (locale === "zh") return /** @type {LocalizedString} */ ("语言生态")
	if (locale === "ja") return /** @type {LocalizedString} */ ("言語エコシステム")
	if (locale === "ko") return /** @type {LocalizedString} */ ("언어 생태계")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("語言生態")
	if (locale === "de") return /** @type {LocalizedString} */ ("SPRACHÖKOSYSTEME")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ÉCOSYSTÈMES DE LANGAGES")
	if (locale === "uk") return /** @type {LocalizedString} */ ("МОВНІ ЕКОСИСТЕМИ")
	return /** @type {LocalizedString} */ ("LANGUAGE ECOSYSTEMS")
});
export { homelayerlanguageecosystems3 as "homeLayerLanguageEcosystems" }