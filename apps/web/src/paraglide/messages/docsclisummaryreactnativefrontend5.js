/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativefrontend5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Estilos del frontend nativo de Expo.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Expo 原生前端的样式方案。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Expo ネイティブフロントエンドのスタイリング。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Expo 네이티브 프런트엔드 스타일링.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Expo 原生前端的樣式方案。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Styling für das native Expo-Frontend.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Style du frontend natif Expo.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Стилізація нативного фронтенду Expo.")
	return /** @type {LocalizedString} */ ("Expo native frontend styling.")
});
export { docsclisummaryreactnativefrontend5 as "docsCliSummaryReactNativeFrontend" }