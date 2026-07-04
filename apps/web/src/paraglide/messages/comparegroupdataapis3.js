/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupdataapis3Inputs */

const en_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Data & APIs`)
};

const es_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datos y APIs`)
};

const zh_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据与 API`)
};

const ja_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`データと API`)
};

const ko_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`데이터 및 APIs`)
};

const zh_hant1_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`資料與 API`)
};

const de_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Daten & APIs`)
};

const fr_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Données et API`)
};

/**
* | output |
* | --- |
* | "Data & APIs" |
*
* @param {Comparegroupdataapis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparegroupdataapis3 = /** @type {((inputs?: Comparegroupdataapis3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupdataapis3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupdataapis3(inputs)
	if (locale === "es") return es_comparegroupdataapis3(inputs)
	if (locale === "zh") return zh_comparegroupdataapis3(inputs)
	if (locale === "ja") return ja_comparegroupdataapis3(inputs)
	if (locale === "ko") return ko_comparegroupdataapis3(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparegroupdataapis3(inputs)
	if (locale === "de") return de_comparegroupdataapis3(inputs)
	return fr_comparegroupdataapis3(inputs)
});
export { comparegroupdataapis3 as "compareGroupDataApis" }