/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightbenchmark3Inputs */

const en_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmarked frontier models scaffolding the same project specs three ways: prompt-only, our CLI, and our MCP server. Agents on the MCP path finished up to 7× faster with 4× fewer output tokens; the full results live on the homepage with an interactive chart.`)
};

const es_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se probaron modelos de frontera creando los mismos specs de proyecto por tres rutas: solo prompt, nuestra CLI y nuestro servidor MCP. En la ruta MCP, los agentes terminaron hasta 7× más rápido con 4× menos tokens de salida; los resultados completos están en la página de inicio con un gráfico interactivo.`)
};

const zh_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用同一组项目 spec 测试前沿模型的三种 scaffold 路径：纯 prompt、我们的 CLI、以及我们的 MCP 服务器。走 MCP 路径的代理最高快 7×，输出 tokens 少 4×；完整结果已在首页通过交互图展示。`)
};

/**
* | output |
* | --- |
* | "Benchmarked frontier models scaffolding the same project specs three ways: prompt-only, our CLI, and our MCP server. Agents on the MCP path finished up to 7×..." |
*
* @param {Changelogrelease20260612highlightbenchmark3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightbenchmark3 = /** @type {((inputs?: Changelogrelease20260612highlightbenchmark3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightbenchmark3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightbenchmark3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightbenchmark3(inputs)
	return zh_changelogrelease20260612highlightbenchmark3(inputs)
});
export { changelogrelease20260612highlightbenchmark3 as "changelogRelease20260612HighlightBenchmark" }