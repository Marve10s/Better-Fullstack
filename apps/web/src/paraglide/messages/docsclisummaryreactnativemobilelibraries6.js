/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobilelibraries6Inputs */

const en_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optional Expo modules.`)
};

const es_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Módulos opcionales de Expo.`)
};

const zh_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可选的 Expo 模块。`)
};

const ja_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`オプションの Expo モジュール。`)
};

const ko_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`선택적 Expo 모듈.`)
};

const zh_hant1_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選用的 Expo 模組。`)
};

const de_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optionale Expo-Module.`)
};

const fr_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modules Expo facultatifs.`)
};

const uk_docsclisummaryreactnativemobilelibraries6 = /** @type {(inputs: Docsclisummaryreactnativemobilelibraries6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Необов’язкові модулі Expo.`)
};

/**
* | output |
* | --- |
* | "Optional Expo modules." |
*
* @param {Docsclisummaryreactnativemobilelibraries6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobilelibraries6 = /** @type {((inputs?: Docsclisummaryreactnativemobilelibraries6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobilelibraries6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativemobilelibraries6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativemobilelibraries6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativemobilelibraries6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativemobilelibraries6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativemobilelibraries6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativemobilelibraries6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativemobilelibraries6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativemobilelibraries6(inputs)
	return en_docsclisummaryreactnativemobilelibraries6(inputs)
});
export { docsclisummaryreactnativemobilelibraries6 as "docsCliSummaryReactNativeMobileLibraries" }