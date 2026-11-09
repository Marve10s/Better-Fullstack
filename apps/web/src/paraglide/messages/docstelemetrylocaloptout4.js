/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetrylocaloptout4Inputs */



/**
* | output |
* | --- |
* | "Browser analytics are disabled for this browser." |
*
* @param {Docstelemetrylocaloptout4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetrylocaloptout4 = /** @type {((inputs?: Docstelemetrylocaloptout4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetrylocaloptout4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La analítica del navegador está desactivada en este navegador.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("此浏览器已关闭浏览器分析。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このブラウザではブラウザ分析が無効です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 브라우저에서는 브라우저 분석이 꺼져 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("此瀏覽器已停用瀏覽器分析。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Browser-Analysen sind für diesen Browser deaktiviert.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les analyses du navigateur sont désactivées pour ce navigateur.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Аналітику браузера вимкнено для цього браузера.")
	return /** @type {LocalizedString} */ ("Browser analytics are disabled for this browser.")
});
export { docstelemetrylocaloptout4 as "docsTelemetryLocalOptOut" }