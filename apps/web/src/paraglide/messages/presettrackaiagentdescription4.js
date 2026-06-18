/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackaiagentdescription4Inputs */

const en_presettrackaiagentdescription4 = /** @type {(inputs: Presettrackaiagentdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A Next.js workspace prepared for AI CLI flows, MCP, skills, and generated agent docs.`)
};

const es_presettrackaiagentdescription4 = /** @type {(inputs: Presettrackaiagentdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace Next.js preparado para flujos AI CLI, MCP, Skills y docs generadas para agentes.`)
};

const zh_presettrackaiagentdescription4 = /** @type {(inputs: Presettrackaiagentdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`为 AI CLI 流程、MCP、Skills 和生成的代理文档准备好的 Next.js workspace。`)
};

const ja_presettrackaiagentdescription4 = /** @type {(inputs: Presettrackaiagentdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI CLI フロー、MCP、スキル、および生成されたエージェント ドキュメント用に準備された Next.js ワークスペース。`)
};

const ko_presettrackaiagentdescription4 = /** @type {(inputs: Presettrackaiagentdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI CLI 흐름, MCP, 기술 및 생성된 상담사 문서를 위해 준비된 Next.js 작업 영역입니다.`)
};

const zh_hant1_presettrackaiagentdescription4 = /** @type {(inputs: Presettrackaiagentdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`為 AI CLI 流程、MCP、Skills 和產生的代理文件準備好的 Next.js workspace。`)
};

const de_presettrackaiagentdescription4 = /** @type {(inputs: Presettrackaiagentdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein Next.js-Arbeitsbereich, der für AI CLI-Flows, MCP, Fertigkeiten und generierte Agentendokumente vorbereitet ist.`)
};

const fr_presettrackaiagentdescription4 = /** @type {(inputs: Presettrackaiagentdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un espace de travail Next.js préparé pour les flux AI CLI, MCP, les compétences et les documents d'agent générés.`)
};

/**
* | output |
* | --- |
* | "A Next.js workspace prepared for AI CLI flows, MCP, skills, and generated agent docs." |
*
* @param {Presettrackaiagentdescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentdescription4 = /** @type {((inputs?: Presettrackaiagentdescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentdescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackaiagentdescription4(inputs)
	if (locale === "es") return es_presettrackaiagentdescription4(inputs)
	if (locale === "zh") return zh_presettrackaiagentdescription4(inputs)
	if (locale === "ja") return ja_presettrackaiagentdescription4(inputs)
	if (locale === "ko") return ko_presettrackaiagentdescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackaiagentdescription4(inputs)
	if (locale === "de") return de_presettrackaiagentdescription4(inputs)
	return fr_presettrackaiagentdescription4(inputs)
});
export { presettrackaiagentdescription4 as "presetTrackAiAgentDescription" }