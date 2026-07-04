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

const ja_changelogrelease20260612highlightmcp3 = /** @type {(inputs: Changelogrelease20260612highlightmcp3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Claude Code、Codex、Gemini CLI、Cursor、VS Code、Claude Desktop、Windsurf、および Zed の 1 回の貼り付け設定で MCP ページを再設計しました。`)
};

const ko_changelogrelease20260612highlightmcp3 = /** @type {(inputs: Changelogrelease20260612highlightmcp3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Claude Code, Codex, Gemini CLI, Cursor, VS Code, Claude Desktop, Windsurf 및 Zed에 대한 한 번의 붙여넣기 설정으로 MCP 페이지를 재설계했습니다.`)
};

const zh_hant1_changelogrelease20260612highlightmcp3 = /** @type {(inputs: Changelogrelease20260612highlightmcp3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新設計 MCP 頁面，為 Claude Code、Codex、Gemini CLI、Cursor、VS Code、Claude Desktop、Windsurf 和 Zed 提供一次貼上即可配置的入口。`)
};

const de_changelogrelease20260612highlightmcp3 = /** @type {(inputs: Changelogrelease20260612highlightmcp3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die MCP-Seite wurde mit One-Paste-Setup für Claude Code, Codex, Gemini CLI, Cursor, VS Code, Claude Desktop, Windsurf und Zed neu gestaltet.`)
};

const fr_changelogrelease20260612highlightmcp3 = /** @type {(inputs: Changelogrelease20260612highlightmcp3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Refonte de la page MCP avec une configuration en un seul collage pour Claude Code, Codex, Gemini CLI, Cursor, VS Code, Claude Desktop, Windsurf et Zed.`)
};

/**
* | output |
* | --- |
* | "Redesigned the MCP page with one-paste setup for Claude Code, Codex, Gemini CLI, Cursor, VS Code, Claude Desktop, Windsurf, and Zed." |
*
* @param {Changelogrelease20260612highlightmcp3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightmcp3 = /** @type {((inputs?: Changelogrelease20260612highlightmcp3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightmcp3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightmcp3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightmcp3(inputs)
	if (locale === "zh") return zh_changelogrelease20260612highlightmcp3(inputs)
	if (locale === "ja") return ja_changelogrelease20260612highlightmcp3(inputs)
	if (locale === "ko") return ko_changelogrelease20260612highlightmcp3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612highlightmcp3(inputs)
	if (locale === "de") return de_changelogrelease20260612highlightmcp3(inputs)
	return fr_changelogrelease20260612highlightmcp3(inputs)
});
export { changelogrelease20260612highlightmcp3 as "changelogRelease20260612HighlightMcp" }