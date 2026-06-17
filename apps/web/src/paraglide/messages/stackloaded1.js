/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackloaded1Inputs */

const en_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack loaded successfully`)
};

const es_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack cargado correctamente`)
};

const zh_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 加载成功`)
};

const ja_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタックが正常にロードされました`)
};

const ko_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택이 성공적으로 로드되었습니다.`)
};

const zh_hant1_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 載入成功`)
};

const de_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stapel erfolgreich geladen`)
};

const fr_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pile chargée avec succès`)
};

/**
* | output |
* | --- |
* | "Stack loaded successfully" |
*
* @param {Stackloaded1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const stackloaded1 = /** @type {((inputs?: Stackloaded1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackloaded1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackloaded1(inputs)
	if (locale === "es") return es_stackloaded1(inputs)
	if (locale === "zh") return zh_stackloaded1(inputs)
	if (locale === "ja") return ja_stackloaded1(inputs)
	if (locale === "ko") return ko_stackloaded1(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackloaded1(inputs)
	if (locale === "de") return de_stackloaded1(inputs)
	return fr_stackloaded1(inputs)
});
export { stackloaded1 as "stackLoaded" }