/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpseotitle2Inputs */



/**
* | output |
* | --- |
* | "MCP Server - AI Agent Integration \| Better Fullstack" |
*
* @param {Mcpseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpseotitle2 = /** @type {((inputs?: Mcpseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Servidor MCP - Integración con agentes de IA | Better Fullstack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("MCP 服务器 - AI 代理集成 | Better Fullstack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("MCP サーバー - AI エージェントの統合 | Better Fullstack")
	if (locale === "ko") return /** @type {LocalizedString} */ ("MCP 서버 - AI 에이전트 통합 | Better Fullstack")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("MCP 伺服器 - AI 代理程式整合 | Better Fullstack")
	if (locale === "de") return /** @type {LocalizedString} */ ("MCP Server – AI Agentenintegration | Better Fullstack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Serveur MCP - Intégration d'agents AI | Better Fullstack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("MCP-сервер - інтеграція з AI-агентами | Better Fullstack")
	return /** @type {LocalizedString} */ ("MCP Server - AI Agent Integration | Better Fullstack")
});
export { mcpseotitle2 as "mcpSeoTitle" }