/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaldescription2Inputs */



/**
* | output |
* | --- |
* | "In ScaffBench, MCP-guided project creation is faster and more reliable than asking an agent to hand-write a project from scratch." |
*
* @param {Mcpfinaldescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpfinaldescription2 = /** @type {((inputs?: Mcpfinaldescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaldescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("En ScaffBench, crear proyectos guiados por MCP es más rápido y fiable que pedirle a un agente que escriba todo desde cero.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在 ScaffBench 中，由 MCP 引导的项目创建比让代理从零手写项目更快也更可靠。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ScaffBench では、MCP のガイド付きプロジェクト作成は、エージェントにプロジェクトを最初から手書きで作成させるよりも速く、信頼性が高くなります。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("ScaffBench에서는 MCP 안내에 따라 프로젝트를 생성하는 것이 에이전트에게 프로젝트를 처음부터 직접 작성하도록 요청하는 것보다 더 빠르고 안정적입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在 ScaffBench 中，由 MCP 引導的專案建立比讓代理從零手寫專案更快也更可靠。")
	if (locale === "de") return /** @type {LocalizedString} */ ("In ScaffBench ist die MCP-geführte Projekterstellung schneller und zuverlässiger, als einen Agenten zu bitten, ein Projekt von Grund auf handschriftlich zu schreiben.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dans ScaffBench, la création de projet guidée par MCP est plus rapide et plus fiable que de demander à un agent d'écrire manuellement un projet à partir de zéro.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("У ScaffBench створення проєкту через MCP швидше й надійніше, ніж просити агента писати проєкт вручну з нуля.")
	return /** @type {LocalizedString} */ ("In ScaffBench, MCP-guided project creation is faster and more reliable than asking an agent to hand-write a project from scratch.")
});
export { mcpfinaldescription2 as "mcpFinalDescription" }