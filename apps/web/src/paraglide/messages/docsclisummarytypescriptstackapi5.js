/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackapi5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Capa API. tRPC está orientado a React.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("API 层。tRPC 面向 React。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("API レイヤー。tRPC は React 向けです。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("API 계층. tRPC는 React 중심입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("API 層。tRPC 以 React 為主要目標。")
	if (locale === "de") return /** @type {LocalizedString} */ ("API-Schicht. tRPC ist auf React ausgerichtet.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Couche API. tRPC est orienté React.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шар API. tRPC орієнтований на React.")
	return /** @type {LocalizedString} */ ("API layer. tRPC is React-oriented.")
});
export { docsclisummarytypescriptstackapi5 as "docsCliSummaryTypescriptStackApi" }