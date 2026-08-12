/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagefforts2Inputs */

const en_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`reasoning effort, where the model supports it`)
};

const es_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`esfuerzo de razonamiento, cuando el modelo lo admite`)
};

const zh_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`推理强度，在模型支持的情况下`)
};

const ja_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モデルがそれをサポートする推論努力`)
};

const ko_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모델이 뒷받침하는 추론 노력`)
};

const zh_hant1_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`推理強度（在模型支援的情況下）`)
};

const de_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Argumentationsaufwand, sofern das Modell dies unterstützt`)
};

const fr_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`effort de raisonnement, lorsque le modèle le prend en charge`)
};

const uk_runflagefforts2 = /** @type {(inputs: Runflagefforts2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`міркування, якщо модель підтримує це`)
};

/**
* | output |
* | --- |
* | "reasoning effort, where the model supports it" |
*
* @param {Runflagefforts2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runflagefforts2 = /** @type {((inputs?: Runflagefforts2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagefforts2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runflagefforts2(inputs)
	if (locale === "zh") return zh_runflagefforts2(inputs)
	if (locale === "ja") return ja_runflagefforts2(inputs)
	if (locale === "ko") return ko_runflagefforts2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagefforts2(inputs)
	if (locale === "de") return de_runflagefforts2(inputs)
	if (locale === "fr") return fr_runflagefforts2(inputs)
	if (locale === "uk") return uk_runflagefforts2(inputs)
	return en_runflagefforts2(inputs)
});
export { runflagefforts2 as "runFlagEfforts" }