/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmfailedbuilds2Inputs */

const en_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed builds`)
};

const es_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builds fallidos`)
};

const zh_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失败构建`)
};

const ja_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失敗したビルド`)
};

const ko_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실패한 빌드`)
};

const zh_hant1_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失敗建構`)
};

const de_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fehlgeschlagene Builds`)
};

const fr_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructions échouées`)
};

const uk_llmfailedbuilds2 = /** @type {(inputs: Llmfailedbuilds2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Невдалі збірки`)
};

/**
* | output |
* | --- |
* | "Failed builds" |
*
* @param {Llmfailedbuilds2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmfailedbuilds2 = /** @type {((inputs?: Llmfailedbuilds2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmfailedbuilds2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmfailedbuilds2(inputs)
	if (locale === "es") return es_llmfailedbuilds2(inputs)
	if (locale === "zh") return zh_llmfailedbuilds2(inputs)
	if (locale === "ja") return ja_llmfailedbuilds2(inputs)
	if (locale === "ko") return ko_llmfailedbuilds2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmfailedbuilds2(inputs)
	if (locale === "de") return de_llmfailedbuilds2(inputs)
	if (locale === "fr") return fr_llmfailedbuilds2(inputs)
	return uk_llmfailedbuilds2(inputs)
});
export { llmfailedbuilds2 as "llmFailedBuilds" }