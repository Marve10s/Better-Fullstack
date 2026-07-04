/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runcolmodels2Inputs */

const en_runcolmodels2 = /** @type {(inputs: Runcolmodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Example models`)
};

const es_runcolmodels2 = /** @type {(inputs: Runcolmodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modelos de ejemplo`)
};

const zh_runcolmodels2 = /** @type {(inputs: Runcolmodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`示例模型`)
};

const ja_runcolmodels2 = /** @type {(inputs: Runcolmodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`サンプルモデル`)
};

const ko_runcolmodels2 = /** @type {(inputs: Runcolmodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`예시 모델`)
};

const zh_hant1_runcolmodels2 = /** @type {(inputs: Runcolmodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`範例模型`)
};

const de_runcolmodels2 = /** @type {(inputs: Runcolmodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Beispielmodelle`)
};

const fr_runcolmodels2 = /** @type {(inputs: Runcolmodels2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exemples de modèles`)
};

/**
* | output |
* | --- |
* | "Example models" |
*
* @param {Runcolmodels2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runcolmodels2 = /** @type {((inputs?: Runcolmodels2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runcolmodels2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runcolmodels2(inputs)
	if (locale === "es") return es_runcolmodels2(inputs)
	if (locale === "zh") return zh_runcolmodels2(inputs)
	if (locale === "ja") return ja_runcolmodels2(inputs)
	if (locale === "ko") return ko_runcolmodels2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runcolmodels2(inputs)
	if (locale === "de") return de_runcolmodels2(inputs)
	return fr_runcolmodels2(inputs)
});
export { runcolmodels2 as "runColModels" }