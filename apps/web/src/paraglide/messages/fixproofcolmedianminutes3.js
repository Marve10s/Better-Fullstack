/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolmedianminutes3Inputs */

const en_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median minutes`)
};

const es_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mediana de minutos`)
};

const zh_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`耗时中位数（分钟）`)
};

const ja_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所要時間の中央値 (分)`)
};

const ko_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`중앙값 분`)
};

const zh_hant1_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`耗時中位數（分鐘）`)
};

const de_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median-Minuten`)
};

const fr_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Minutes médianes`)
};

const uk_fixproofcolmedianminutes3 = /** @type {(inputs: Fixproofcolmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Медіана хвилин`)
};

/**
* | output |
* | --- |
* | "Median minutes" |
*
* @param {Fixproofcolmedianminutes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolmedianminutes3 = /** @type {((inputs?: Fixproofcolmedianminutes3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolmedianminutes3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolmedianminutes3(inputs)
	if (locale === "zh") return zh_fixproofcolmedianminutes3(inputs)
	if (locale === "ja") return ja_fixproofcolmedianminutes3(inputs)
	if (locale === "ko") return ko_fixproofcolmedianminutes3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolmedianminutes3(inputs)
	if (locale === "de") return de_fixproofcolmedianminutes3(inputs)
	if (locale === "fr") return fr_fixproofcolmedianminutes3(inputs)
	if (locale === "uk") return uk_fixproofcolmedianminutes3(inputs)
	return en_fixproofcolmedianminutes3(inputs)
});
export { fixproofcolmedianminutes3 as "fixproofColMedianMinutes" }