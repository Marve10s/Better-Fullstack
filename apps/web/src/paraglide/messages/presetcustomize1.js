/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetcustomize1Inputs */

const en_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Customize preset`)
};

const es_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Personalizar plantilla`)
};

const zh_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自定义预设`)
};

const ja_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセットをカスタマイズする`)
};

const ko_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정 사용자 정의`)
};

const zh_hant1_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自訂預設`)
};

const de_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellung anpassen`)
};

const fr_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Personnaliser le préréglage`)
};

const uk_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштувати попередні налаштування`)
};

/**
* | output |
* | --- |
* | "Customize preset" |
*
* @param {Presetcustomize1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetcustomize1 = /** @type {((inputs?: Presetcustomize1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetcustomize1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetcustomize1(inputs)
	if (locale === "es") return es_presetcustomize1(inputs)
	if (locale === "zh") return zh_presetcustomize1(inputs)
	if (locale === "ja") return ja_presetcustomize1(inputs)
	if (locale === "ko") return ko_presetcustomize1(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetcustomize1(inputs)
	if (locale === "de") return de_presetcustomize1(inputs)
	if (locale === "fr") return fr_presetcustomize1(inputs)
	return uk_presetcustomize1(inputs)
});
export { presetcustomize1 as "presetCustomize" }