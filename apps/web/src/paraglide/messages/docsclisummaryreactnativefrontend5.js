/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativefrontend5Inputs */

const en_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo native frontend styling.`)
};

const es_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Estilos del frontend nativo de Expo.`)
};

const zh_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo 原生前端的样式方案。`)
};

const ja_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo ネイティブフロントエンドのスタイリング。`)
};

const ko_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo 네이티브 프런트엔드 스타일링.`)
};

const zh_hant1_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo 原生前端的樣式方案。`)
};

const de_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Styling für das native Expo-Frontend.`)
};

const fr_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Style du frontend natif Expo.`)
};

const uk_docsclisummaryreactnativefrontend5 = /** @type {(inputs: Docsclisummaryreactnativefrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Стилізація нативного фронтенду Expo.`)
};

/**
* | output |
* | --- |
* | "Expo native frontend styling." |
*
* @param {Docsclisummaryreactnativefrontend5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativefrontend5 = /** @type {((inputs?: Docsclisummaryreactnativefrontend5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativefrontend5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativefrontend5(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativefrontend5(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativefrontend5(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativefrontend5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativefrontend5(inputs)
	if (locale === "de") return de_docsclisummaryreactnativefrontend5(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativefrontend5(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativefrontend5(inputs)
	return en_docsclisummaryreactnativefrontend5(inputs)
});
export { docsclisummaryreactnativefrontend5 as "docsCliSummaryReactNativeFrontend" }