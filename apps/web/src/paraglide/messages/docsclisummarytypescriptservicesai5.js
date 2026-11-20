/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesai5Inputs */



/**
* | output |
* | --- |
* | "AI SDK / agent framework." |
*
* @param {Docsclisummarytypescriptservicesai5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesai5 = /** @type {((inputs?: Docsclisummarytypescriptservicesai5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesai5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("SDK de AI / framework de agentes.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("AI SDK / 代理框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("AI SDK / エージェントフレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("AI SDK / 에이전트 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("AI SDK / 代理框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("AI-SDK / Agenten-Framework.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("SDK d’AI / framework d’agents.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("SDK для AI / фреймворк агентів.")
	return /** @type {LocalizedString} */ ("AI SDK / agent framework.")
});
export { docsclisummarytypescriptservicesai5 as "docsCliSummaryTypescriptServicesAi" }