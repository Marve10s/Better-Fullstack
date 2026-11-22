/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navbenchmark1Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Benchmark")
	if (locale === "zh") return /** @type {LocalizedString} */ ("基准测试")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ベンチマーク")
	if (locale === "ko") return /** @type {LocalizedString} */ ("벤치마크")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("基準測試")
	if (locale === "de") return /** @type {LocalizedString} */ ("Benchmark")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Benchmark")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бенчмарк")
	return /** @type {LocalizedString} */ ("Benchmark")
});
export { navbenchmark1 as "navBenchmark" }