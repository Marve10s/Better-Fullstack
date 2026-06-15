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

/**
* | output |
* | --- |
* | "scaffolds through our MCP tools" |
*
* @param {Llmpathmcpdetail3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmpathmcpdetail3 = /** @type {((inputs?: Llmpathmcpdetail3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathmcpdetail3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathmcpdetail3(inputs)
	if (locale === "es") return es_llmpathmcpdetail3(inputs)
	return zh_llmpathmcpdetail3(inputs)
});
export { llmpathmcpdetail3 as "llmPathMcpDetail" }