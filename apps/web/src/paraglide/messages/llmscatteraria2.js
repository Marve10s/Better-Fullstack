/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmscatteraria2Inputs */

const en_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark scatter chart: each point is one model and creation path`)
};

const es_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gráfico de dispersión del benchmark: cada punto es un modelo y una ruta de creación`)
};

const zh_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark 散点图：每个点代表一个模型和一种创建路径`)
};

/**
* | output |
* | --- |
* | "Benchmark scatter chart: each point is one model and creation path" |
*
* @param {Llmscatteraria2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmscatteraria2 = /** @type {((inputs?: Llmscatteraria2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmscatteraria2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmscatteraria2(inputs)
	if (locale === "es") return es_llmscatteraria2(inputs)
	return zh_llmscatteraria2(inputs)
});
export { llmscatteraria2 as "llmScatterAria" }