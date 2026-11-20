/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackaiagentintent4Inputs */



/**
* | output |
* | --- |
* | "Build with agents" |
*
* @param {Presettrackaiagentintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentintent4 = /** @type {((inputs?: Presettrackaiagentintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Construir con agentes")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用代理构建")
	if (locale === "ja") return /** @type {LocalizedString} */ ("エージェントを使用して構築する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("에이전트로 구축")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用代理構建")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bauen Sie mit Agenten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Construire avec des agents")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Будувати з агентами")
	return /** @type {LocalizedString} */ ("Build with agents")
});
export { presettrackaiagentintent4 as "presetTrackAiAgentIntent" }