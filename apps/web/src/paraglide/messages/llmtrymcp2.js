/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmtrymcp2Inputs */



/**
* | output |
* | --- |
* | "Try out MCP" |
*
* @param {Llmtrymcp2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmtrymcp2 = /** @type {((inputs?: Llmtrymcp2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmtrymcp2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Probar MCP")
	if (locale === "zh") return /** @type {LocalizedString} */ ("试用 MCP")
	if (locale === "ja") return /** @type {LocalizedString} */ ("MCP を試してみる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("MCP를 사용해 보세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("試試 MCP")
	if (locale === "de") return /** @type {LocalizedString} */ ("Probieren Sie MCP aus")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Essayez MCP")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спробувати MCP")
	return /** @type {LocalizedString} */ ("Try out MCP")
});
export { llmtrymcp2 as "llmTryMcp" }