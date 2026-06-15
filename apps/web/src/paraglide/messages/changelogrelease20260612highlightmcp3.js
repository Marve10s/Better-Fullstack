/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightmcp3Inputs */

const en_changelogrelease20260612highlightmcp3 = /** @type {(inputs: Changelogrelease20260612highlightmcp3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Redesigned the MCP page with one-paste setup for Claude Code, Codex, Gemini CLI, Cursor, VS Code, Claude Desktop, Windsurf, and Zed.`)
};

const es_changelogrelease20260612highlightmcp3 = /** @type {(inputs: Changelogrelease20260612highlightmcp3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se rediseñó la página MCP con configuración de pegar una vez para Claude Code, Codex, Gemini CLI, Cursor, VS Code, Claude Desktop, Windsurf y Zed.`)
};

const zh_changelogrelease20260612highlightmcp3 = /** @type {(inputs: Changelogrelease20260612highlightmcp3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新设计 MCP 页面，为 Claude Code、Codex、Gemini CLI、Cursor、VS Code、Claude Desktop、Windsurf 和 Zed 提供一次粘贴即可配置的入口。`)
};

/**
* | output |
* | --- |
* | "Redesigned the MCP page with one-paste setup for Claude Code, Codex, Gemini CLI, Cursor, VS Code, Claude Desktop, Windsurf, and Zed." |
*
* @param {Changelogrelease20260612highlightmcp3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightmcp3 = /** @type {((inputs?: Changelogrelease20260612highlightmcp3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightmcp3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightmcp3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightmcp3(inputs)
	return zh_changelogrelease20260612highlightmcp3(inputs)
});
export { changelogrelease20260612highlightmcp3 as "changelogRelease20260612HighlightMcp" }