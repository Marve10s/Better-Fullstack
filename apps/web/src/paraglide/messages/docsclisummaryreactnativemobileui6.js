/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobileui6Inputs */

const en_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile UI kit.`)
};

const es_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kit de interfaz móvil.`)
};

const zh_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动端 UI 套件。`)
};

const ja_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モバイル UI キット。`)
};

const ko_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모바일 UI 키트.`)
};

const zh_hant1_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`行動裝置 UI 套件。`)
};

const de_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`UI-Kit für mobile Apps.`)
};

const fr_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kit d’interface mobile.`)
};

const uk_docsclisummaryreactnativemobileui6 = /** @type {(inputs: Docsclisummaryreactnativemobileui6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Набір компонентів мобільного інтерфейсу.`)
};

/**
* | output |
* | --- |
* | "Mobile UI kit." |
*
* @param {Docsclisummaryreactnativemobileui6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobileui6 = /** @type {((inputs?: Docsclisummaryreactnativemobileui6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobileui6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativemobileui6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativemobileui6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativemobileui6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativemobileui6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativemobileui6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativemobileui6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativemobileui6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativemobileui6(inputs)
	return en_docsclisummaryreactnativemobileui6(inputs)
});
export { docsclisummaryreactnativemobileui6 as "docsCliSummaryReactNativeMobileUi" }