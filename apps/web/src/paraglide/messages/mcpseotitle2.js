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

const ja_mcpseotitle2 = /** @type {(inputs: Mcpseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP サーバー — AI エージェントの統合 | Better Fullstack`)
};

const ko_mcpseotitle2 = /** @type {(inputs: Mcpseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP 서버 — AI 에이전트 통합 | Better Fullstack`)
};

const zh_hant1_mcpseotitle2 = /** @type {(inputs: Mcpseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP 伺服器 — AI 代理程式整合 | Better Fullstack`)
};

const de_mcpseotitle2 = /** @type {(inputs: Mcpseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP Server – AI Agentenintegration | Better Fullstack`)
};

const fr_mcpseotitle2 = /** @type {(inputs: Mcpseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Serveur MCP — AI Intégration de l'agent | Better Fullstack`)
};

/**
* | output |
* | --- |
* | "MCP Server — AI Agent Integration \| Better Fullstack" |
*
* @param {Mcpseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpseotitle2 = /** @type {((inputs?: Mcpseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpseotitle2(inputs)
	if (locale === "es") return es_mcpseotitle2(inputs)
	if (locale === "zh") return zh_mcpseotitle2(inputs)
	if (locale === "ja") return ja_mcpseotitle2(inputs)
	if (locale === "ko") return ko_mcpseotitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpseotitle2(inputs)
	if (locale === "de") return de_mcpseotitle2(inputs)
	return fr_mcpseotitle2(inputs)
});
export { mcpseotitle2 as "mcpSeoTitle" }