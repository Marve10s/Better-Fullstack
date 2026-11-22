/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatfasterpromptonly4Inputs */



/**
* | output |
* | --- |
* | "faster than prompt-only" |
*
* @param {Mcpstatfasterpromptonly4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpstatfasterpromptonly4 = /** @type {((inputs?: Mcpstatfasterpromptonly4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatfasterpromptonly4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("más rápido que solo prompt")
	if (locale === "zh") return /** @type {LocalizedString} */ ("比纯 prompt 更快")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロンプトのみよりも高速")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프롬프트 전용보다 빠릅니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("比純 prompt 更快")
	if (locale === "de") return /** @type {LocalizedString} */ ("schneller als nur per Prompt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("plus rapide que l'invite uniquement")
	if (locale === "uk") return /** @type {LocalizedString} */ ("швидше за prompt-only")
	return /** @type {LocalizedString} */ ("faster than prompt-only")
});
export { mcpstatfasterpromptonly4 as "mcpStatFasterPromptOnly" }