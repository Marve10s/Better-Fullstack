/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalyou2Inputs */



/**
* | output |
* | --- |
* | "you:" |
*
* @param {Mcpterminalyou2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpterminalyou2 = /** @type {((inputs?: Mcpterminalyou2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalyou2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("tú:")
	if (locale === "zh") return /** @type {LocalizedString} */ ("你：")
	if (locale === "ja") return /** @type {LocalizedString} */ ("あなた：")
	if (locale === "ko") return /** @type {LocalizedString} */ ("당신:")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("你：")
	if (locale === "de") return /** @type {LocalizedString} */ ("Du:")
	if (locale === "fr") return /** @type {LocalizedString} */ ("toi:")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ви:")
	return /** @type {LocalizedString} */ ("you:")
});
export { mcpterminalyou2 as "mcpTerminalYou" }