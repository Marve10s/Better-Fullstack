/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnstyle5Inputs */

const en_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn style preset.`)
};

const es_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Estilo predefinido de shadcn.`)
};

const zh_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn 样式预设。`)
};

const ja_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn のスタイルプリセット。`)
};

const ko_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn 스타일 사전 설정.`)
};

const zh_hant1_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn 樣式預設。`)
};

const de_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stilvoreinstellung für shadcn.`)
};

const fr_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préréglage de style shadcn.`)
};

const uk_docsclisummaryshadcnshadcnstyle5 = /** @type {(inputs: Docsclisummaryshadcnshadcnstyle5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Готовий стиль shadcn.`)
};

/**
* | output |
* | --- |
* | "shadcn style preset." |
*
* @param {Docsclisummaryshadcnshadcnstyle5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnstyle5 = /** @type {((inputs?: Docsclisummaryshadcnshadcnstyle5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnstyle5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryshadcnshadcnstyle5(inputs)
	if (locale === "zh") return zh_docsclisummaryshadcnshadcnstyle5(inputs)
	if (locale === "ja") return ja_docsclisummaryshadcnshadcnstyle5(inputs)
	if (locale === "ko") return ko_docsclisummaryshadcnshadcnstyle5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryshadcnshadcnstyle5(inputs)
	if (locale === "de") return de_docsclisummaryshadcnshadcnstyle5(inputs)
	if (locale === "fr") return fr_docsclisummaryshadcnshadcnstyle5(inputs)
	if (locale === "uk") return uk_docsclisummaryshadcnshadcnstyle5(inputs)
	return en_docsclisummaryshadcnshadcnstyle5(inputs)
});
export { docsclisummaryshadcnshadcnstyle5 as "docsCliSummaryShadcnShadcnStyle" }