/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpseodescription2Inputs */

const en_mcpseodescription2 = /** @type {(inputs: Mcpseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect AI coding agents to Better Fullstack via MCP. Let Claude, Cursor, VS Code Copilot, and other agents scaffold fullstack projects programmatically.`)
};

const es_mcpseodescription2 = /** @type {(inputs: Mcpseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Conecta agentes de programación con Better Fullstack mediante MCP. Permite que Claude, Cursor, VS Code Copilot y otros agentes creen proyectos fullstack programáticamente.`)
};

const zh_mcpseodescription2 = /** @type {(inputs: Mcpseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过 MCP 将 AI 编程代理连接到 Better Fullstack。让 Claude、Cursor、VS Code Copilot 和其他代理以编程方式生成全栈项目。`)
};

/**
* | output |
* | --- |
* | "Connect AI coding agents to Better Fullstack via MCP. Let Claude, Cursor, VS Code Copilot, and other agents scaffold fullstack projects programmatically." |
*
* @param {Mcpseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpseodescription2 = /** @type {((inputs?: Mcpseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpseodescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpseodescription2(inputs)
	if (locale === "es") return es_mcpseodescription2(inputs)
	return zh_mcpseodescription2(inputs)
});
export { mcpseodescription2 as "mcpSeoDescription" }