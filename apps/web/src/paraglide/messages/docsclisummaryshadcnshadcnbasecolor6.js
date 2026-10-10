/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnbasecolor6Inputs */

const en_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base neutral color.`)
};

const es_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Color neutro base.`)
};

const zh_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基础中性色。`)
};

const ja_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベースのニュートラルカラー。`)
};

const ko_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기본 중립 색상.`)
};

const zh_hant1_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基礎中性色。`)
};

const de_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neutrale Grundfarbe.`)
};

const fr_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couleur neutre de base.`)
};

const uk_docsclisummaryshadcnshadcnbasecolor6 = /** @type {(inputs: Docsclisummaryshadcnshadcnbasecolor6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Базовий нейтральний колір.`)
};

/**
* | output |
* | --- |
* | "Base neutral color." |
*
* @param {Docsclisummaryshadcnshadcnbasecolor6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnbasecolor6 = /** @type {((inputs?: Docsclisummaryshadcnshadcnbasecolor6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnbasecolor6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryshadcnshadcnbasecolor6(inputs)
	if (locale === "zh") return zh_docsclisummaryshadcnshadcnbasecolor6(inputs)
	if (locale === "ja") return ja_docsclisummaryshadcnshadcnbasecolor6(inputs)
	if (locale === "ko") return ko_docsclisummaryshadcnshadcnbasecolor6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryshadcnshadcnbasecolor6(inputs)
	if (locale === "de") return de_docsclisummaryshadcnshadcnbasecolor6(inputs)
	if (locale === "fr") return fr_docsclisummaryshadcnshadcnbasecolor6(inputs)
	if (locale === "uk") return uk_docsclisummaryshadcnshadcnbasecolor6(inputs)
	return en_docsclisummaryshadcnshadcnbasecolor6(inputs)
});
export { docsclisummaryshadcnshadcnbasecolor6 as "docsCliSummaryShadcnShadcnBaseColor" }