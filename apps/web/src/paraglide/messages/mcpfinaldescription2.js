/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaldescription2Inputs */

const en_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`In ScaffBench, MCP-guided project creation is faster and more reliable than asking an agent to hand-write a project from scratch.`)
};

const es_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En ScaffBench, crear proyectos guiados por MCP es más rápido y fiable que pedir a un agente escribir todo desde cero.`)
};

const zh_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 ScaffBench 中，由 MCP 引导的项目创建比让代理从零手写项目更快也更可靠。`)
};

const ja_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench、MCP のガイド付きプロジェクト作成は、エージェントにプロジェクトを最初から手書きで作成するよう依頼するよりも速く、信頼性が高くなります。`)
};

const ko_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench에서는 MCP 안내에 따라 프로젝트를 생성하는 것이 에이전트에게 프로젝트를 처음부터 직접 작성하도록 요청하는 것보다 더 빠르고 안정적입니다.`)
};

const zh_hant1_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 ScaffBench 中，由 MCP 引導的項目建立比讓代理從零手寫項目更快也更可靠。`)
};

const de_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`In ScaffBench ist die MCP-geführte Projekterstellung schneller und zuverlässiger, als einen Agenten zu bitten, ein Projekt von Grund auf handschriftlich zu schreiben.`)
};

const fr_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dans ScaffBench, la création de projet guidée par MCP est plus rapide et plus fiable que de demander à un agent d'écrire manuellement un projet à partir de zéro.`)
};

/**
* | output |
* | --- |
* | "In ScaffBench, MCP-guided project creation is faster and more reliable than asking an agent to hand-write a project from scratch." |
*
* @param {Mcpfinaldescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpfinaldescription2 = /** @type {((inputs?: Mcpfinaldescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaldescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpfinaldescription2(inputs)
	if (locale === "es") return es_mcpfinaldescription2(inputs)
	if (locale === "zh") return zh_mcpfinaldescription2(inputs)
	if (locale === "ja") return ja_mcpfinaldescription2(inputs)
	if (locale === "ko") return ko_mcpfinaldescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpfinaldescription2(inputs)
	if (locale === "de") return de_mcpfinaldescription2(inputs)
	return fr_mcpfinaldescription2(inputs)
});
export { mcpfinaldescription2 as "mcpFinalDescription" }