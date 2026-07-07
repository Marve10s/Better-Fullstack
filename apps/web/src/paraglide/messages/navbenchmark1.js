/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navbenchmark1Inputs */

const en_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark`)
};

const es_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark`)
};

const zh_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基准测试`)
};

const ja_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマーク`)
};

const ko_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벤치마크`)
};

const zh_hant1_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基準測試`)
};

const de_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark`)
};

const fr_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark`)
};

const uk_navbenchmark1 = /** @type {(inputs: Navbenchmark1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бенчмарк`)
};

/**
* | output |
* | --- |
* | "Benchmark" |
*
* @param {Navbenchmark1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navbenchmark1 = /** @type {((inputs?: Navbenchmark1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navbenchmark1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navbenchmark1(inputs)
	if (locale === "es") return es_navbenchmark1(inputs)
	if (locale === "zh") return zh_navbenchmark1(inputs)
	if (locale === "ja") return ja_navbenchmark1(inputs)
	if (locale === "ko") return ko_navbenchmark1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navbenchmark1(inputs)
	if (locale === "de") return de_navbenchmark1(inputs)
	if (locale === "fr") return fr_navbenchmark1(inputs)
	return uk_navbenchmark1(inputs)
});
export { navbenchmark1 as "navBenchmark" }