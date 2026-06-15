/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmbenchmarkdescription2Inputs */

const en_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Measuring coding agents on real fullstack scaffolding tasks — time, tokens, cost, and whether the result actually builds.`)
};

const es_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mide agentes de programación en tareas reales de scaffolding fullstack: tiempo, tokens, coste y si el resultado realmente compila.`)
};

const zh_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用真实全栈脚手架任务衡量编程代理：时间、tokens、成本，以及结果是否真的能构建。`)
};

/**
* | output |
* | --- |
* | "Measuring coding agents on real fullstack scaffolding tasks — time, tokens, cost, and whether the result actually builds." |
*
* @param {Llmbenchmarkdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmbenchmarkdescription2 = /** @type {((inputs?: Llmbenchmarkdescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmbenchmarkdescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmbenchmarkdescription2(inputs)
	if (locale === "es") return es_llmbenchmarkdescription2(inputs)
	return zh_llmbenchmarkdescription2(inputs)
});
export { llmbenchmarkdescription2 as "llmBenchmarkDescription" }