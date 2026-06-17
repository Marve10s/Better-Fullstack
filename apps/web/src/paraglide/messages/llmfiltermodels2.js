/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmfiltermodels2Inputs */

const en_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter models`)
};

const es_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filtrar modelos`)
};

const zh_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`筛选模型`)
};

const ja_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フィルターモデル`)
};

const ko_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모델 필터링`)
};

const zh_hant1_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`篩選模型`)
};

const de_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modelle filtern`)
};

const fr_llmfiltermodels2 = /** @type {(inputs: Llmfiltermodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filtrer les modèles`)
};

/**
* | output |
* | --- |
* | "Filter models" |
*
* @param {Llmfiltermodels2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmfiltermodels2 = /** @type {((inputs?: Llmfiltermodels2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmfiltermodels2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmfiltermodels2(inputs)
	if (locale === "es") return es_llmfiltermodels2(inputs)
	if (locale === "zh") return zh_llmfiltermodels2(inputs)
	if (locale === "ja") return ja_llmfiltermodels2(inputs)
	if (locale === "ko") return ko_llmfiltermodels2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmfiltermodels2(inputs)
	if (locale === "de") return de_llmfiltermodels2(inputs)
	return fr_llmfiltermodels2(inputs)
});
export { llmfiltermodels2 as "llmFilterModels" }