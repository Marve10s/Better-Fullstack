/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaleyebrow2Inputs */



/**
* | output |
* | --- |
* | "benchmark-backed" |
*
* @param {Mcpfinaleyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpfinaleyebrow2 = /** @type {((inputs?: Mcpfinaleyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaleyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("respaldado por benchmark")
	if (locale === "zh") return /** @type {LocalizedString} */ ("由 benchmark 支撑")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ベンチマークに裏付けられた")
	if (locale === "ko") return /** @type {LocalizedString} */ ("벤치마크 지원")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("由 benchmark 支撐")
	if (locale === "de") return /** @type {LocalizedString} */ ("Benchmark-gestützt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("appuyé par un benchmark")
	if (locale === "uk") return /** @type {LocalizedString} */ ("підтверджено бенчмарком")
	return /** @type {LocalizedString} */ ("benchmark-backed")
});
export { mcpfinaleyebrow2 as "mcpFinalEyebrow" }