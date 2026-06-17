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

const ja_mcpreadprotocol2 = /** @type {(inputs: Mcpreadprotocol2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP プロトコルの読み取り`)
};

const ko_mcpreadprotocol2 = /** @type {(inputs: Mcpreadprotocol2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP 프로토콜 읽기`)
};

const zh_hant1_mcpreadprotocol2 = /** @type {(inputs: Mcpreadprotocol2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閱讀 MCP 協議`)
};

const de_mcpreadprotocol2 = /** @type {(inputs: Mcpreadprotocol2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lesen Sie das Protokoll MCP`)
};

const fr_mcpreadprotocol2 = /** @type {(inputs: Mcpreadprotocol2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lire le protocole MCP`)
};

/**
* | output |
* | --- |
* | "Read MCP protocol" |
*
* @param {Mcpreadprotocol2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpreadprotocol2 = /** @type {((inputs?: Mcpreadprotocol2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpreadprotocol2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpreadprotocol2(inputs)
	if (locale === "es") return es_mcpreadprotocol2(inputs)
	if (locale === "zh") return zh_mcpreadprotocol2(inputs)
	if (locale === "ja") return ja_mcpreadprotocol2(inputs)
	if (locale === "ko") return ko_mcpreadprotocol2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpreadprotocol2(inputs)
	if (locale === "de") return de_mcpreadprotocol2(inputs)
	return fr_mcpreadprotocol2(inputs)
});
export { mcpreadprotocol2 as "mcpReadProtocol" }