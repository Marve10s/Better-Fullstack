/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpseotitle2Inputs */

const en_mcpseotitle2 = /** @type {(inputs: Mcpseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP Server — AI Agent Integration | Better Fullstack`)
};

const es_mcpseotitle2 = /** @type {(inputs: Mcpseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Servidor MCP — Integración con agentes de IA | Better Fullstack`)
};

const zh_mcpseotitle2 = /** @type {(inputs: Mcpseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP 服务器 — AI 代理集成 | Better Fullstack`)
};

/**
* | output |
* | --- |
* | "MCP Server — AI Agent Integration \| Better Fullstack" |
*
* @param {Mcpseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpseotitle2 = /** @type {((inputs?: Mcpseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpseotitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpseotitle2(inputs)
	if (locale === "es") return es_mcpseotitle2(inputs)
	return zh_mcpseotitle2(inputs)
});
export { mcpseotitle2 as "mcpSeoTitle" }