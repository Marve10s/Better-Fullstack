/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navmcp1Inputs */



/**
* | output |
* | --- |
* | "MCP" |
*
* @param {Navmcp1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navmcp1 = /** @type {((inputs?: Navmcp1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navmcp1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("MCP")
	if (locale === "zh") return /** @type {LocalizedString} */ ("MCP")
	if (locale === "ja") return /** @type {LocalizedString} */ ("MCP")
	if (locale === "ko") return /** @type {LocalizedString} */ ("MCP")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("MCP")
	if (locale === "de") return /** @type {LocalizedString} */ ("MCP")
	if (locale === "fr") return /** @type {LocalizedString} */ ("MCP")
	if (locale === "uk") return /** @type {LocalizedString} */ ("MCP")
	return /** @type {LocalizedString} */ ("MCP")
});
export { navmcp1 as "navMcp" }