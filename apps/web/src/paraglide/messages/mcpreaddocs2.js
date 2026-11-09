/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpreaddocs2Inputs */



/**
* | output |
* | --- |
* | "Read MCP docs" |
*
* @param {Mcpreaddocs2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpreaddocs2 = /** @type {((inputs?: Mcpreaddocs2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpreaddocs2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Leer docs MCP")
	if (locale === "zh") return /** @type {LocalizedString} */ ("阅读 MCP 文档")
	if (locale === "ja") return /** @type {LocalizedString} */ ("MCP ドキュメントを読む")
	if (locale === "ko") return /** @type {LocalizedString} */ ("MCP 문서 읽기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("閱讀 MCP 文檔")
	if (locale === "de") return /** @type {LocalizedString} */ ("Lesen Sie die Dokumentation zu MCP")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Lire la documentation MCP")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Читати документацію MCP")
	return /** @type {LocalizedString} */ ("Read MCP docs")
});
export { mcpreaddocs2 as "mcpReadDocs" }