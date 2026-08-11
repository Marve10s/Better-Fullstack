/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmbuildspassing2Inputs */

const en_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builds passing`)
};

const es_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builds que pasan`)
};

const zh_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过构建`)
};

const ja_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルドの合格`)
};

const ko_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌드 통과`)
};

const zh_hant1_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`透過建構`)
};

const de_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erfolgreiche Builds`)
};

const fr_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructions réussies`)
};

const uk_llmbuildspassing2 = /** @type {(inputs: Llmbuildspassing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Успішні збірки`)
};

/**
* | output |
* | --- |
* | "Builds passing" |
*
* @param {Llmbuildspassing2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmbuildspassing2 = /** @type {((inputs?: Llmbuildspassing2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmbuildspassing2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_llmbuildspassing2(inputs)
	if (locale === "zh") return zh_llmbuildspassing2(inputs)
	if (locale === "ja") return ja_llmbuildspassing2(inputs)
	if (locale === "ko") return ko_llmbuildspassing2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmbuildspassing2(inputs)
	if (locale === "de") return de_llmbuildspassing2(inputs)
	if (locale === "fr") return fr_llmbuildspassing2(inputs)
	if (locale === "uk") return uk_llmbuildspassing2(inputs)
	return en_llmbuildspassing2(inputs)
});
export { llmbuildspassing2 as "llmBuildsPassing" }