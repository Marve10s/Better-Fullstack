/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpviewbenchmark2Inputs */

const en_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View benchmark`)
};

const es_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ver benchmark`)
};

const zh_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看 benchmark`)
};

const ja_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマークを表示する`)
};

const ko_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벤치마크 보기`)
};

const zh_hant1_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`看 benchmark`)
};

const de_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark ansehen`)
};

const fr_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voir l'indice de référence`)
};

/**
* | output |
* | --- |
* | "View benchmark" |
*
* @param {Mcpviewbenchmark2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpviewbenchmark2 = /** @type {((inputs?: Mcpviewbenchmark2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpviewbenchmark2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpviewbenchmark2(inputs)
	if (locale === "es") return es_mcpviewbenchmark2(inputs)
	if (locale === "zh") return zh_mcpviewbenchmark2(inputs)
	if (locale === "ja") return ja_mcpviewbenchmark2(inputs)
	if (locale === "ko") return ko_mcpviewbenchmark2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpviewbenchmark2(inputs)
	if (locale === "de") return de_mcpviewbenchmark2(inputs)
	return fr_mcpviewbenchmark2(inputs)
});
export { mcpviewbenchmark2 as "mcpViewBenchmark" }