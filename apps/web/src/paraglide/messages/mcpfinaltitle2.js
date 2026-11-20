/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaltitle2Inputs */



/**
* | output |
* | --- |
* | "2.6× faster than" |
*
* @param {Mcpfinaltitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpfinaltitle2 = /** @type {((inputs?: Mcpfinaltitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaltitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("2.6× más rápido que")
	if (locale === "zh") return /** @type {LocalizedString} */ ("比")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロンプトのみより")
	if (locale === "ko") return /** @type {LocalizedString} */ ("2.6배 더 빠르다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("比")
	if (locale === "de") return /** @type {LocalizedString} */ ("2,6× schneller als")
	if (locale === "fr") return /** @type {LocalizedString} */ ("2,6 fois plus rapide que")
	if (locale === "uk") return /** @type {LocalizedString} */ ("2,6× швидше, ніж")
	return /** @type {LocalizedString} */ ("2.6× faster than")
});
export { mcpfinaltitle2 as "mcpFinalTitle" }