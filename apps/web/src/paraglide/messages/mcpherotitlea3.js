/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpherotitlea3Inputs */



/**
* | output |
* | --- |
* | "Your agent." |
*
* @param {Mcpherotitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpherotitlea3 = /** @type {((inputs?: Mcpherotitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpherotitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Tu agente.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("你的代理。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("あなたのエージェント。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("당신의 에이전트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("你的代理程式。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ihr Agent.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Votre agent.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Ваш агент.")
	return /** @type {LocalizedString} */ ("Your agent.")
});
export { mcpherotitlea3 as "mcpHeroTitleA" }