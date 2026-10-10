/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobilenavigation6Inputs */

const en_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navigation library.`)
};

const es_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de navegación.`)
};

const zh_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导航库。`)
};

const ja_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ナビゲーションライブラリ。`)
};

const ko_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`내비게이션 라이브러리.`)
};

const zh_hant1_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`導覽函式庫。`)
};

const de_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navigationsbibliothek.`)
};

const fr_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de navigation.`)
};

const uk_docsclisummaryreactnativemobilenavigation6 = /** @type {(inputs: Docsclisummaryreactnativemobilenavigation6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека навігації.`)
};

/**
* | output |
* | --- |
* | "Navigation library." |
*
* @param {Docsclisummaryreactnativemobilenavigation6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobilenavigation6 = /** @type {((inputs?: Docsclisummaryreactnativemobilenavigation6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobilenavigation6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativemobilenavigation6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativemobilenavigation6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativemobilenavigation6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativemobilenavigation6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativemobilenavigation6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativemobilenavigation6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativemobilenavigation6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativemobilenavigation6(inputs)
	return en_docsclisummaryreactnativemobilenavigation6(inputs)
});
export { docsclisummaryreactnativemobilenavigation6 as "docsCliSummaryReactNativeMobileNavigation" }