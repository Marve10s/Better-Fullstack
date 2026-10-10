/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativekotlinmobile6Inputs */

const en_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kotlin mobile app.`)
};

const es_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aplicación móvil Kotlin.`)
};

const zh_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kotlin 移动应用。`)
};

const ja_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kotlin モバイルアプリ。`)
};

const ko_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kotlin 모바일 앱.`)
};

const zh_hant1_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kotlin 行動應用程式。`)
};

const de_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App mit Kotlin.`)
};

const fr_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Application mobile Kotlin.`)
};

const uk_docsclisummaryreactnativekotlinmobile6 = /** @type {(inputs: Docsclisummaryreactnativekotlinmobile6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Мобільний застосунок Kotlin.`)
};

/**
* | output |
* | --- |
* | "Kotlin mobile app." |
*
* @param {Docsclisummaryreactnativekotlinmobile6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativekotlinmobile6 = /** @type {((inputs?: Docsclisummaryreactnativekotlinmobile6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativekotlinmobile6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativekotlinmobile6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativekotlinmobile6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativekotlinmobile6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativekotlinmobile6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativekotlinmobile6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativekotlinmobile6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativekotlinmobile6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativekotlinmobile6(inputs)
	return en_docsclisummaryreactnativekotlinmobile6(inputs)
});
export { docsclisummaryreactnativekotlinmobile6 as "docsCliSummaryReactNativeKotlinMobile" }