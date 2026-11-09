/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpherotitleb3Inputs */



/**
* | output |
* | --- |
* | "Every stack." |
*
* @param {Mcpherotitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpherotitleb3 = /** @type {((inputs?: Mcpherotitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpherotitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cada stack.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("任何 stack。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("すべてのスタック。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모든 스택.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("任何 stack。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Jeder Stack.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Chaque pile.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Будь-який стек.")
	return /** @type {LocalizedString} */ ("Every stack.")
});
export { mcpherotitleb3 as "mcpHeroTitleB" }