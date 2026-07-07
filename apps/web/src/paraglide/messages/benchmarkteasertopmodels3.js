/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Benchmarkteasertopmodels3Inputs */

const en_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Top models`)
};

const es_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mejores modelos`)
};

const zh_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`顶尖模型`)
};

const ja_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`トップモデル`)
};

const ko_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`상위 모델`)
};

const zh_hant1_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`頂尖模型`)
};

const de_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Top-Modelle`)
};

const fr_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Meilleurs modèles`)
};

const uk_benchmarkteasertopmodels3 = /** @type {(inputs: Benchmarkteasertopmodels3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Найкращі моделі`)
};

/**
* | output |
* | --- |
* | "Top models" |
*
* @param {Benchmarkteasertopmodels3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const benchmarkteasertopmodels3 = /** @type {((inputs?: Benchmarkteasertopmodels3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Benchmarkteasertopmodels3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_benchmarkteasertopmodels3(inputs)
	if (locale === "es") return es_benchmarkteasertopmodels3(inputs)
	if (locale === "zh") return zh_benchmarkteasertopmodels3(inputs)
	if (locale === "ja") return ja_benchmarkteasertopmodels3(inputs)
	if (locale === "ko") return ko_benchmarkteasertopmodels3(inputs)
	if (locale === "zh-Hant") return zh_hant1_benchmarkteasertopmodels3(inputs)
	if (locale === "de") return de_benchmarkteasertopmodels3(inputs)
	if (locale === "fr") return fr_benchmarkteasertopmodels3(inputs)
	return uk_benchmarkteasertopmodels3(inputs)
});
export { benchmarkteasertopmodels3 as "benchmarkTeaserTopModels" }