/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderuniversal1Inputs */



/**
* | output |
* | --- |
* | "Universal" |
*
* @param {Builderuniversal1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderuniversal1 = /** @type {((inputs?: Builderuniversal1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderuniversal1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Universal")
	if (locale === "zh") return /** @type {LocalizedString} */ ("通用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ユニバーサル")
	if (locale === "ko") return /** @type {LocalizedString} */ ("범용")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("通用")
	if (locale === "de") return /** @type {LocalizedString} */ ("Universal")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Universel")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Універсальний")
	return /** @type {LocalizedString} */ ("Universal")
});
export { builderuniversal1 as "builderUniversal" }