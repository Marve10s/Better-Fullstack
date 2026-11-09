/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetryenabled2Inputs */



/**
* | output |
* | --- |
* | "Browser analytics are enabled." |
*
* @param {Docstelemetryenabled2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetryenabled2 = /** @type {((inputs?: Docstelemetryenabled2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetryenabled2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La analítica del navegador está activada.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("浏览器分析已开启。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブラウザ分析は有効です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("브라우저 분석이 켜져 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("瀏覽器分析已啟用。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Browser-Analysen sind aktiviert.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les analyses du navigateur sont activées.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Аналітику браузера ввімкнено.")
	return /** @type {LocalizedString} */ ("Browser analytics are enabled.")
});
export { docstelemetryenabled2 as "docsTelemetryEnabled" }