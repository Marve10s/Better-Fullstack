/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackuse3Inputs */

const en_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Use this stack`)
};

const es_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usar este stack`)
};

const zh_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用此技术栈`)
};

const ja_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このスタックを使う`)
};

const ko_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 스택 사용`)
};

const zh_hant1_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用此技術堆疊`)
};

const de_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diesen Stack verwenden`)
};

const fr_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Utiliser ce stack`)
};

const uk_presetfuturestackuse3 = /** @type {(inputs: Presetfuturestackuse3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Використати цей стек`)
};

/**
* | output |
* | --- |
* | "Use this stack" |
*
* @param {Presetfuturestackuse3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackuse3 = /** @type {((inputs?: Presetfuturestackuse3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackuse3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_presetfuturestackuse3(inputs)
	if (locale === "zh") return zh_presetfuturestackuse3(inputs)
	if (locale === "ja") return ja_presetfuturestackuse3(inputs)
	if (locale === "ko") return ko_presetfuturestackuse3(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetfuturestackuse3(inputs)
	if (locale === "de") return de_presetfuturestackuse3(inputs)
	if (locale === "fr") return fr_presetfuturestackuse3(inputs)
	if (locale === "uk") return uk_presetfuturestackuse3(inputs)
	return en_presetfuturestackuse3(inputs)
});
export { presetfuturestackuse3 as "presetFutureStackUse" }