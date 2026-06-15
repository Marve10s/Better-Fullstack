/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmbenchmarkmetric2Inputs */

const en_llmbenchmarkmetric2 = /** @type {(inputs: Llmbenchmarkmetric2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark metric`)
};

const es_llmbenchmarkmetric2 = /** @type {(inputs: Llmbenchmarkmetric2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Métrica del benchmark`)
};

const zh_llmbenchmarkmetric2 = /** @type {(inputs: Llmbenchmarkmetric2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark 指标`)
};

/**
* | output |
* | --- |
* | "Benchmark metric" |
*
* @param {Llmbenchmarkmetric2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmbenchmarkmetric2 = /** @type {((inputs?: Llmbenchmarkmetric2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmbenchmarkmetric2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmbenchmarkmetric2(inputs)
	if (locale === "es") return es_llmbenchmarkmetric2(inputs)
	return zh_llmbenchmarkmetric2(inputs)
});
export { llmbenchmarkmetric2 as "llmBenchmarkMetric" }