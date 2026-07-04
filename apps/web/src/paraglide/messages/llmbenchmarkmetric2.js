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

const ja_llmbenchmarkmetric2 = /** @type {(inputs: Llmbenchmarkmetric2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマーク指標`)
};

const ko_llmbenchmarkmetric2 = /** @type {(inputs: Llmbenchmarkmetric2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벤치마크 지표`)
};

const zh_hant1_llmbenchmarkmetric2 = /** @type {(inputs: Llmbenchmarkmetric2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark 指標`)
};

const de_llmbenchmarkmetric2 = /** @type {(inputs: Llmbenchmarkmetric2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark-Metrik`)
};

const fr_llmbenchmarkmetric2 = /** @type {(inputs: Llmbenchmarkmetric2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Métrique de référence`)
};

/**
* | output |
* | --- |
* | "Benchmark metric" |
*
* @param {Llmbenchmarkmetric2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmbenchmarkmetric2 = /** @type {((inputs?: Llmbenchmarkmetric2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmbenchmarkmetric2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmbenchmarkmetric2(inputs)
	if (locale === "es") return es_llmbenchmarkmetric2(inputs)
	if (locale === "zh") return zh_llmbenchmarkmetric2(inputs)
	if (locale === "ja") return ja_llmbenchmarkmetric2(inputs)
	if (locale === "ko") return ko_llmbenchmarkmetric2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmbenchmarkmetric2(inputs)
	if (locale === "de") return de_llmbenchmarkmetric2(inputs)
	return fr_llmbenchmarkmetric2(inputs)
});
export { llmbenchmarkmetric2 as "llmBenchmarkMetric" }