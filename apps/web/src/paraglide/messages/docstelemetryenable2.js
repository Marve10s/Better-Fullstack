/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetryenable2Inputs */



/**
* | output |
* | --- |
* | "Enable browser analytics" |
*
* @param {Docstelemetryenable2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetryenable2 = /** @type {((inputs?: Docstelemetryenable2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetryenable2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Activar la analítica del navegador")
	if (locale === "zh") return /** @type {LocalizedString} */ ("开启浏览器分析")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブラウザ分析を有効にする")
	if (locale === "ko") return /** @type {LocalizedString} */ ("브라우저 분석 켜기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("啟用瀏覽器分析")
	if (locale === "de") return /** @type {LocalizedString} */ ("Browser-Analysen aktivieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Activer les analyses du navigateur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Увімкнути аналітику браузера")
	return /** @type {LocalizedString} */ ("Enable browser analytics")
});
export { docstelemetryenable2 as "docsTelemetryEnable" }