/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmmodels1Inputs */

const en_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Models`)
};

const es_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modelos`)
};

const zh_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`模型`)
};

const ja_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モデル`)
};

const ko_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모델`)
};

const zh_hant1_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`模型`)
};

const de_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modelle`)
};

const fr_llmmodels1 = /** @type {(inputs: Llmmodels1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modèles`)
};

/**
* | output |
* | --- |
* | "Models" |
*
* @param {Llmmodels1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmmodels1 = /** @type {((inputs?: Llmmodels1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmmodels1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmmodels1(inputs)
	if (locale === "es") return es_llmmodels1(inputs)
	if (locale === "zh") return zh_llmmodels1(inputs)
	if (locale === "ja") return ja_llmmodels1(inputs)
	if (locale === "ko") return ko_llmmodels1(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmmodels1(inputs)
	if (locale === "de") return de_llmmodels1(inputs)
	return fr_llmmodels1(inputs)
});
export { llmmodels1 as "llmModels" }