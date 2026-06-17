/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmerrorrate2Inputs */

const en_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Error rate`)
};

const es_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasa de error`)
};

const zh_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`错误率`)
};

const ja_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エラー率`)
};

const ko_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`오류율`)
};

const zh_hant1_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`錯誤率`)
};

const de_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fehlerquote`)
};

const fr_llmerrorrate2 = /** @type {(inputs: Llmerrorrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Taux d'erreur`)
};

/**
* | output |
* | --- |
* | "Error rate" |
*
* @param {Llmerrorrate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmerrorrate2 = /** @type {((inputs?: Llmerrorrate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmerrorrate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmerrorrate2(inputs)
	if (locale === "es") return es_llmerrorrate2(inputs)
	if (locale === "zh") return zh_llmerrorrate2(inputs)
	if (locale === "ja") return ja_llmerrorrate2(inputs)
	if (locale === "ko") return ko_llmerrorrate2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmerrorrate2(inputs)
	if (locale === "de") return de_llmerrorrate2(inputs)
	return fr_llmerrorrate2(inputs)
});
export { llmerrorrate2 as "llmErrorRate" }