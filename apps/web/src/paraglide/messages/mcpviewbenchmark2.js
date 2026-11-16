/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpviewbenchmark2Inputs */



/**
* | output |
* | --- |
* | "View benchmark" |
*
* @param {Mcpviewbenchmark2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpviewbenchmark2 = /** @type {((inputs?: Mcpviewbenchmark2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpviewbenchmark2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ver benchmark")
	if (locale === "zh") return /** @type {LocalizedString} */ ("查看 benchmark")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ベンチマークを表示する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("벤치마크 보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("看 benchmark")
	if (locale === "de") return /** @type {LocalizedString} */ ("Benchmark ansehen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Voir le benchmark")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Переглянути бенчмарк")
	return /** @type {LocalizedString} */ ("View benchmark")
});
export { mcpviewbenchmark2 as "mcpViewBenchmark" }