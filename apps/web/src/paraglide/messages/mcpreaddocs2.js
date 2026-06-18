/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpreaddocs2Inputs */

const en_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read MCP docs`)
};

const es_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer docs MCP`)
};

const zh_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读 MCP 文档`)
};

const ja_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP ドキュメントを読む`)
};

const ko_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP 문서 읽기`)
};

const zh_hant1_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閱讀 MCP 文檔`)
};

const de_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lesen Sie die Dokumentation zu MCP`)
};

const fr_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lire la documentation MCP`)
};

/**
* | output |
* | --- |
* | "Read MCP docs" |
*
* @param {Mcpreaddocs2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpreaddocs2 = /** @type {((inputs?: Mcpreaddocs2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpreaddocs2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpreaddocs2(inputs)
	if (locale === "es") return es_mcpreaddocs2(inputs)
	if (locale === "zh") return zh_mcpreaddocs2(inputs)
	if (locale === "ja") return ja_mcpreaddocs2(inputs)
	if (locale === "ko") return ko_mcpreaddocs2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpreaddocs2(inputs)
	if (locale === "de") return de_mcpreaddocs2(inputs)
	return fr_mcpreaddocs2(inputs)
});
export { mcpreaddocs2 as "mcpReadDocs" }