/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpathmcpdetail3Inputs */

const en_llmpathmcpdetail3 = /** @type {(inputs: Llmpathmcpdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`scaffolds through our MCP tools`)
};

const es_llmpathmcpdetail3 = /** @type {(inputs: Llmpathmcpdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`crea el scaffold mediante nuestras herramientas MCP`)
};

const zh_llmpathmcpdetail3 = /** @type {(inputs: Llmpathmcpdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过我们的 MCP 工具生成 scaffold`)
};

const ja_llmpathmcpdetail3 = /** @type {(inputs: Llmpathmcpdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP ツールを使用した足場`)
};

const ko_llmpathmcpdetail3 = /** @type {(inputs: Llmpathmcpdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP 도구를 통한 비계`)
};

const zh_hant1_llmpathmcpdetail3 = /** @type {(inputs: Llmpathmcpdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`透過我們的 MCP 工具產生 scaffold`)
};

const de_llmpathmcpdetail3 = /** @type {(inputs: Llmpathmcpdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gerüste durch unsere MCP-Tools`)
};

const fr_llmpathmcpdetail3 = /** @type {(inputs: Llmpathmcpdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`échafaudages grâce à nos outils MCP`)
};

/**
* | output |
* | --- |
* | "scaffolds through our MCP tools" |
*
* @param {Llmpathmcpdetail3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmpathmcpdetail3 = /** @type {((inputs?: Llmpathmcpdetail3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathmcpdetail3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathmcpdetail3(inputs)
	if (locale === "es") return es_llmpathmcpdetail3(inputs)
	if (locale === "zh") return zh_llmpathmcpdetail3(inputs)
	if (locale === "ja") return ja_llmpathmcpdetail3(inputs)
	if (locale === "ko") return ko_llmpathmcpdetail3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmpathmcpdetail3(inputs)
	if (locale === "de") return de_llmpathmcpdetail3(inputs)
	return fr_llmpathmcpdetail3(inputs)
});
export { llmpathmcpdetail3 as "llmPathMcpDetail" }