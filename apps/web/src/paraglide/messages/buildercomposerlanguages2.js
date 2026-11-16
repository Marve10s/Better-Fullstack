/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerlanguages2Inputs */



/**
* | output |
* | --- |
* | "Languages" |
*
* @param {Buildercomposerlanguages2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerlanguages2 = /** @type {((inputs?: Buildercomposerlanguages2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerlanguages2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Lenguajes")
	if (locale === "zh") return /** @type {LocalizedString} */ ("语言")
	if (locale === "ja") return /** @type {LocalizedString} */ ("言語")
	if (locale === "ko") return /** @type {LocalizedString} */ ("언어")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("語言")
	if (locale === "de") return /** @type {LocalizedString} */ ("Sprachen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Langages")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Мови")
	return /** @type {LocalizedString} */ ("Languages")
});
export { buildercomposerlanguages2 as "builderComposerLanguages" }