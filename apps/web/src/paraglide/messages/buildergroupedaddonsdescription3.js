/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupedaddonsdescription3Inputs */

const en_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`platforms, integrations, AI agents, and TanStack extras are split below. MCP and Skills still add the addon flags first, then the CLI asks follow-up questions to configure them.`)
};

const es_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`plataformas, integraciones, agentes de IA y extras de TanStack se dividen abajo. MCP y Skills aún añaden primero los flags, luego la CLI hace preguntas de configuración.`)
};

const zh_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台、集成、AI 代理和 TanStack 扩展会在下方拆分展示。MCP 和 Skills 仍会先添加 addon flags，然后 CLI 会继续询问配置。`)
};

/**
* | output |
* | --- |
* | "platforms, integrations, AI agents, and TanStack extras are split below. MCP and Skills still add the addon flags first, then the CLI asks follow-up question..." |
*
* @param {Buildergroupedaddonsdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildergroupedaddonsdescription3 = /** @type {((inputs?: Buildergroupedaddonsdescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupedaddonsdescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupedaddonsdescription3(inputs)
	if (locale === "es") return es_buildergroupedaddonsdescription3(inputs)
	return zh_buildergroupedaddonsdescription3(inputs)
});
export { buildergroupedaddonsdescription3 as "builderGroupedAddonsDescription" }