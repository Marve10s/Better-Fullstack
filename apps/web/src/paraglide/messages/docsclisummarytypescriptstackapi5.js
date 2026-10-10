/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackapi5Inputs */

const en_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API layer. tRPC is React-oriented.`)
};

const es_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Capa API. tRPC está orientado a React.`)
};

const zh_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API 层。tRPC 面向 React。`)
};

const ja_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API レイヤー。tRPC は React 向けです。`)
};

const ko_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API 계층. tRPC는 React 중심입니다.`)
};

const zh_hant1_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API 層。tRPC 以 React 為主要目標。`)
};

const de_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-Schicht. tRPC ist auf React ausgerichtet.`)
};

const fr_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couche API. tRPC est orienté React.`)
};

const uk_docsclisummarytypescriptstackapi5 = /** @type {(inputs: Docsclisummarytypescriptstackapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шар API. tRPC орієнтований на React.`)
};

/**
* | output |
* | --- |
* | "API layer. tRPC is React-oriented." |
*
* @param {Docsclisummarytypescriptstackapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackapi5 = /** @type {((inputs?: Docsclisummarytypescriptstackapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackapi5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackapi5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackapi5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackapi5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackapi5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackapi5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackapi5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackapi5(inputs)
	return en_docsclisummarytypescriptstackapi5(inputs)
});
export { docsclisummarytypescriptstackapi5 as "docsCliSummaryTypescriptStackApi" }