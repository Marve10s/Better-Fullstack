/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackaiagentdescription4Inputs */



/**
* | output |
* | --- |
* | "A Next.js workspace prepared for AI CLI flows, MCP, skills, and generated agent docs." |
*
* @param {Presettrackaiagentdescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentdescription4 = /** @type {((inputs?: Presettrackaiagentdescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentdescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Workspace Next.js preparado para flujos AI CLI, MCP, Skills y docs generadas para agentes.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("为 AI CLI 流程、MCP、Skills 和生成的代理文档准备好的 Next.js workspace。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("AI CLI フロー、MCP、スキル、および生成されたエージェント ドキュメント用に準備された Next.js ワークスペース。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("AI CLI 흐름, MCP, Skills 및 생성된 에이전트 문서를 위해 준비된 Next.js 작업 영역입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("為 AI CLI 流程、MCP、Skills 和產生的代理文件準備好的 Next.js workspace。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ein Next.js-Arbeitsbereich, der für AI CLI-Flows, MCP, Fertigkeiten und generierte Agentendokumente vorbereitet ist.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Un espace de travail Next.js préparé pour les flux AI CLI, MCP, les compétences et les documents d'agent générés.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Next.js workspace, підготовлений для AI CLI-флоу, MCP, Skills і згенерованих agent docs.")
	return /** @type {LocalizedString} */ ("A Next.js workspace prepared for AI CLI flows, MCP, skills, and generated agent docs.")
});
export { presettrackaiagentdescription4 as "presetTrackAiAgentDescription" }