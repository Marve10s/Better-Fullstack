/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativedartmobile6Inputs */

const en_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flutter / Dart mobile app.`)
};

const es_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aplicación móvil Flutter / Dart.`)
};

const zh_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flutter / Dart 移动应用。`)
};

const ja_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flutter / Dart モバイルアプリ。`)
};

const ko_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flutter / Dart 모바일 앱.`)
};

const zh_hant1_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flutter / Dart 行動應用程式。`)
};

const de_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App mit Flutter / Dart.`)
};

const fr_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Application mobile Flutter / Dart.`)
};

const uk_docsclisummaryreactnativedartmobile6 = /** @type {(inputs: Docsclisummaryreactnativedartmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Мобільний застосунок Flutter / Dart.`)
};

/**
* | output |
* | --- |
* | "Flutter / Dart mobile app." |
*
* @param {Docsclisummaryreactnativedartmobile6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativedartmobile6 = /** @type {((inputs?: Docsclisummaryreactnativedartmobile6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativedartmobile6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativedartmobile6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativedartmobile6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativedartmobile6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativedartmobile6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativedartmobile6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativedartmobile6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativedartmobile6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativedartmobile6(inputs)
	return en_docsclisummaryreactnativedartmobile6(inputs)
});
export { docsclisummaryreactnativedartmobile6 as "docsCliSummaryReactNativeDartMobile" }