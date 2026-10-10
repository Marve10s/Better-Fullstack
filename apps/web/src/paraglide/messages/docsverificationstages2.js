/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationstages2Inputs */

const en_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Required stages`)
};

const es_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Etapas obligatorias`)
};

const zh_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`必需阶段`)
};

const ja_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`必須ステージ`)
};

const ko_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`필수 단계`)
};

const zh_hant1_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`必要階段`)
};

const de_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erforderliche Phasen`)
};

const fr_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Étapes requises`)
};

const uk_docsverificationstages2 = /** @type {(inputs: Docsverificationstages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Обовʼязкові етапи`)
};

/**
* | output |
* | --- |
* | "Required stages" |
*
* @param {Docsverificationstages2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationstages2 = /** @type {((inputs?: Docsverificationstages2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationstages2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationstages2(inputs)
	if (locale === "zh") return zh_docsverificationstages2(inputs)
	if (locale === "ja") return ja_docsverificationstages2(inputs)
	if (locale === "ko") return ko_docsverificationstages2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationstages2(inputs)
	if (locale === "de") return de_docsverificationstages2(inputs)
	if (locale === "fr") return fr_docsverificationstages2(inputs)
	if (locale === "uk") return uk_docsverificationstages2(inputs)
	return en_docsverificationstages2(inputs)
});
export { docsverificationstages2 as "docsVerificationStages" }