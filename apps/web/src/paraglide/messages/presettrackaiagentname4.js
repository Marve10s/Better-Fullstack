/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackaiagentname4Inputs */



/**
* | output |
* | --- |
* | "AI Agent App" |
*
* @param {Presettrackaiagentname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentname4 = /** @type {((inputs?: Presettrackaiagentname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("App de agente de IA")
	if (locale === "zh") return /** @type {LocalizedString} */ ("AI 代理应用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("AI エージェント アプリ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("AI 에이전트 앱")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("AI 代理應用")
	if (locale === "de") return /** @type {LocalizedString} */ ("AI Agent-App")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Application d'agent AI")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Застосунок з AI-агентом")
	return /** @type {LocalizedString} */ ("AI Agent App")
});
export { presettrackaiagentname4 as "presetTrackAiAgentName" }