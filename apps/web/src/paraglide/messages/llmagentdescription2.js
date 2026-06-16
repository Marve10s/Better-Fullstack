/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmagentdescription2Inputs */

const en_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One MCP server, every spec-to-scaffold tool the benchmark used. Pick your agent, paste, done.`)
};

const es_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un servidor MCP y todas las herramientas para pasar de especificación a scaffold que usó el benchmark. Elige tu agente, pega y listo.`)
};

const zh_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一个 MCP 服务器，包含 benchmark 使用的所有 spec-to-scaffold 工具。选择代理，粘贴，就绪。`)
};

/**
* | output |
* | --- |
* | "One MCP server, every spec-to-scaffold tool the benchmark used. Pick your agent, paste, done." |
*
* @param {Llmagentdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmagentdescription2 = /** @type {((inputs?: Llmagentdescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmagentdescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmagentdescription2(inputs)
	if (locale === "es") return es_llmagentdescription2(inputs)
	return zh_llmagentdescription2(inputs)
});
export { llmagentdescription2 as "llmAgentDescription" }