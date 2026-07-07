/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Benchmarkteasercta2Inputs */

const en_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`See the full benchmark`)
};

const es_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ver el benchmark completo`)
};

const zh_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看完整基准测试`)
};

const ja_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマーク全体を見る`)
};

const ko_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`전체 벤치마크 보기`)
};

const zh_hant1_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看完整基準測試`)
};

const de_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vollständigen Benchmark ansehen`)
};

const fr_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voir le benchmark complet`)
};

const uk_benchmarkteasercta2 = /** @type {(inputs: Benchmarkteasercta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Переглянути повний бенчмарк`)
};

/**
* | output |
* | --- |
* | "See the full benchmark" |
*
* @param {Benchmarkteasercta2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const benchmarkteasercta2 = /** @type {((inputs?: Benchmarkteasercta2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Benchmarkteasercta2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_benchmarkteasercta2(inputs)
	if (locale === "es") return es_benchmarkteasercta2(inputs)
	if (locale === "zh") return zh_benchmarkteasercta2(inputs)
	if (locale === "ja") return ja_benchmarkteasercta2(inputs)
	if (locale === "ko") return ko_benchmarkteasercta2(inputs)
	if (locale === "zh-Hant") return zh_hant1_benchmarkteasercta2(inputs)
	if (locale === "de") return de_benchmarkteasercta2(inputs)
	if (locale === "fr") return fr_benchmarkteasercta2(inputs)
	return uk_benchmarkteasercta2(inputs)
});
export { benchmarkteasercta2 as "benchmarkTeaserCta" }