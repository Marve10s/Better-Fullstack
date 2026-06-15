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

/**
* | output |
* | --- |
* | "A Next.js workspace prepared for AI CLI flows, MCP, skills, and generated agent docs." |
*
* @param {Presettrackaiagentdescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentdescription4 = /** @type {((inputs?: Presettrackaiagentdescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentdescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackaiagentdescription4(inputs)
	if (locale === "es") return es_presettrackaiagentdescription4(inputs)
	return zh_presettrackaiagentdescription4(inputs)
});
export { presettrackaiagentdescription4 as "presetTrackAiAgentDescription" }