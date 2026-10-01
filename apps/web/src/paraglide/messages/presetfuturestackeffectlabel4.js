/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackeffectlabel4Inputs */

const en_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect runs`)
};

const es_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect se ejecuta`)
};

const zh_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect 运行于`)
};

const ja_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect の実行場所`)
};

const ko_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect 실행 위치`)
};

const zh_hant1_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect 執行於`)
};

const de_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect läuft`)
};

const fr_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect s'exécute`)
};

const uk_presetfuturestackeffectlabel4 = /** @type {(inputs: Presetfuturestackeffectlabel4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect працює`)
};

/**
* | output |
* | --- |
* | "Effect runs" |
*
* @param {Presetfuturestackeffectlabel4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackeffectlabel4 = /** @type {((inputs?: Presetfuturestackeffectlabel4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackeffectlabel4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_presetfuturestackeffectlabel4(inputs)
	if (locale === "zh") return zh_presetfuturestackeffectlabel4(inputs)
	if (locale === "ja") return ja_presetfuturestackeffectlabel4(inputs)
	if (locale === "ko") return ko_presetfuturestackeffectlabel4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetfuturestackeffectlabel4(inputs)
	if (locale === "de") return de_presetfuturestackeffectlabel4(inputs)
	if (locale === "fr") return fr_presetfuturestackeffectlabel4(inputs)
	if (locale === "uk") return uk_presetfuturestackeffectlabel4(inputs)
	return en_presetfuturestackeffectlabel4(inputs)
});
export { presetfuturestackeffectlabel4 as "presetFutureStackEffectLabel" }