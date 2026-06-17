/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaleyebrow2Inputs */

const en_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`benchmark-backed`)
};

const es_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`respaldado por benchmark`)
};

const zh_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`由 benchmark 支撑`)
};

const ja_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマークに裏付けられた`)
};

const ko_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벤치마크 지원`)
};

const zh_hant1_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`由 benchmark 支撐`)
};

const de_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark-gestützt`)
};

const fr_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`adossé à un indice de référence`)
};

/**
* | output |
* | --- |
* | "benchmark-backed" |
*
* @param {Mcpfinaleyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpfinaleyebrow2 = /** @type {((inputs?: Mcpfinaleyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaleyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpfinaleyebrow2(inputs)
	if (locale === "es") return es_mcpfinaleyebrow2(inputs)
	if (locale === "zh") return zh_mcpfinaleyebrow2(inputs)
	if (locale === "ja") return ja_mcpfinaleyebrow2(inputs)
	if (locale === "ko") return ko_mcpfinaleyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpfinaleyebrow2(inputs)
	if (locale === "de") return de_mcpfinaleyebrow2(inputs)
	return fr_mcpfinaleyebrow2(inputs)
});
export { mcpfinaleyebrow2 as "mcpFinalEyebrow" }