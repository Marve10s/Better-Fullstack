/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpreadprotocol2Inputs */

const en_mcpreadprotocol2 = /** @type {(inputs: Mcpreadprotocol2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read MCP protocol`)
};

const es_mcpreadprotocol2 = /** @type {(inputs: Mcpreadprotocol2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer protocolo MCP`)
};

const zh_mcpreadprotocol2 = /** @type {(inputs: Mcpreadprotocol2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读 MCP 协议`)
};

/**
* | output |
* | --- |
* | "Read MCP protocol" |
*
* @param {Mcpreadprotocol2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpreadprotocol2 = /** @type {((inputs?: Mcpreadprotocol2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpreadprotocol2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpreadprotocol2(inputs)
	if (locale === "es") return es_mcpreadprotocol2(inputs)
	return zh_mcpreadprotocol2(inputs)
});
export { mcpreadprotocol2 as "mcpReadProtocol" }