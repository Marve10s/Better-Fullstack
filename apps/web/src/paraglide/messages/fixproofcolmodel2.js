/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolmodel2Inputs */

const en_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Model`)
};

const es_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modelo`)
};

const zh_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`模型`)
};

const ja_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モデル`)
};

const ko_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모델`)
};

const zh_hant1_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`模型`)
};

const de_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modell`)
};

const fr_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modèle`)
};

const uk_fixproofcolmodel2 = /** @type {(inputs: Fixproofcolmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Модель`)
};

/**
* | output |
* | --- |
* | "Model" |
*
* @param {Fixproofcolmodel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolmodel2 = /** @type {((inputs?: Fixproofcolmodel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolmodel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolmodel2(inputs)
	if (locale === "zh") return zh_fixproofcolmodel2(inputs)
	if (locale === "ja") return ja_fixproofcolmodel2(inputs)
	if (locale === "ko") return ko_fixproofcolmodel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolmodel2(inputs)
	if (locale === "de") return de_fixproofcolmodel2(inputs)
	if (locale === "fr") return fr_fixproofcolmodel2(inputs)
	if (locale === "uk") return uk_fixproofcolmodel2(inputs)
	return en_fixproofcolmodel2(inputs)
});
export { fixproofcolmodel2 as "fixproofColModel" }