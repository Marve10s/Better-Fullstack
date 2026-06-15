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

/**
* | output |
* | --- |
* | "In ScaffBench, MCP-guided project creation is faster and more reliable than asking an agent to hand-write a project from scratch." |
*
* @param {Mcpfinaldescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpfinaldescription2 = /** @type {((inputs?: Mcpfinaldescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaldescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpfinaldescription2(inputs)
	if (locale === "es") return es_mcpfinaldescription2(inputs)
	return zh_mcpfinaldescription2(inputs)
});
export { mcpfinaldescription2 as "mcpFinalDescription" }