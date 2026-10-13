/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativeswiftmobile6Inputs */

const en_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Swift mobile app.`)
};

const es_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aplicación móvil Swift.`)
};

const zh_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Swift 移动应用。`)
};

const ja_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Swift モバイルアプリ。`)
};

const ko_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Swift 모바일 앱.`)
};

const zh_hant1_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Swift 行動應用程式。`)
};

const de_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App mit Swift.`)
};

const fr_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Application mobile Swift.`)
};

const uk_docsclisummaryreactnativeswiftmobile6 = /** @type {(inputs: Docsclisummaryreactnativeswiftmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Мобільний застосунок Swift.`)
};

/**
* | output |
* | --- |
* | "Swift mobile app." |
*
* @param {Docsclisummaryreactnativeswiftmobile6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativeswiftmobile6 = /** @type {((inputs?: Docsclisummaryreactnativeswiftmobile6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativeswiftmobile6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativeswiftmobile6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativeswiftmobile6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativeswiftmobile6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativeswiftmobile6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativeswiftmobile6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativeswiftmobile6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativeswiftmobile6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativeswiftmobile6(inputs)
	return en_docsclisummaryreactnativeswiftmobile6(inputs)
});
export { docsclisummaryreactnativeswiftmobile6 as "docsCliSummaryReactNativeSwiftMobile" }