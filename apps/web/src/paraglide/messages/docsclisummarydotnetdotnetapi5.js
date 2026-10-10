/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetapi5Inputs */

const en_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET API style.`)
};

const es_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Estilo de API .NET.`)
};

const zh_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET API 风格。`)
};

const ja_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET の API スタイル。`)
};

const ko_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET API 스타일.`)
};

const zh_hant1_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET API 風格。`)
};

const de_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-Stil für .NET.`)
};

const fr_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Style d’API .NET.`)
};

const uk_docsclisummarydotnetdotnetapi5 = /** @type {(inputs: Docsclisummarydotnetdotnetapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Стиль API для .NET.`)
};

/**
* | output |
* | --- |
* | ".NET API style." |
*
* @param {Docsclisummarydotnetdotnetapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetapi5 = /** @type {((inputs?: Docsclisummarydotnetdotnetapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetapi5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetapi5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetapi5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetapi5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetapi5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetapi5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetapi5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetapi5(inputs)
	return en_docsclisummarydotnetdotnetapi5(inputs)
});
export { docsclisummarydotnetdotnetapi5 as "docsCliSummaryDotnetDotnetApi" }