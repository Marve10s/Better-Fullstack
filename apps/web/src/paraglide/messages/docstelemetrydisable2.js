/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetrydisable2Inputs */



/**
* | output |
* | --- |
* | "Disable browser analytics" |
*
* @param {Docstelemetrydisable2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetrydisable2 = /** @type {((inputs?: Docstelemetrydisable2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetrydisable2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Desactivar la analítica del navegador")
	if (locale === "zh") return /** @type {LocalizedString} */ ("关闭浏览器分析")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブラウザ分析を無効にする")
	if (locale === "ko") return /** @type {LocalizedString} */ ("브라우저 분석 끄기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("停用瀏覽器分析")
	if (locale === "de") return /** @type {LocalizedString} */ ("Browser-Analysen deaktivieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Désactiver les analyses du navigateur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вимкнути аналітику браузера")
	return /** @type {LocalizedString} */ ("Disable browser analytics")
});
export { docstelemetrydisable2 as "docsTelemetryDisable" }