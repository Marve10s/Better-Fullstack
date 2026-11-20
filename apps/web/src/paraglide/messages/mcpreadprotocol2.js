/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpreadprotocol2Inputs */



/**
* | output |
* | --- |
* | "Read MCP protocol" |
*
* @param {Mcpreadprotocol2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpreadprotocol2 = /** @type {((inputs?: Mcpreadprotocol2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpreadprotocol2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Leer protocolo MCP")
	if (locale === "zh") return /** @type {LocalizedString} */ ("阅读 MCP 协议")
	if (locale === "ja") return /** @type {LocalizedString} */ ("MCP プロトコルの読み取り")
	if (locale === "ko") return /** @type {LocalizedString} */ ("MCP 프로토콜 읽기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("閱讀 MCP 協議")
	if (locale === "de") return /** @type {LocalizedString} */ ("Lesen Sie das MCP-Protokoll")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Lire le protocole MCP")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Читати MCP-протокол")
	return /** @type {LocalizedString} */ ("Read MCP protocol")
});
export { mcpreadprotocol2 as "mcpReadProtocol" }