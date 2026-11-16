/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetryglobalprivacycontrol4Inputs */



/**
* | output |
* | --- |
* | "Browser analytics are disabled because Global Privacy Control is enabled." |
*
* @param {Docstelemetryglobalprivacycontrol4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetryglobalprivacycontrol4 = /** @type {((inputs?: Docstelemetryglobalprivacycontrol4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetryglobalprivacycontrol4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La analítica del navegador está desactivada porque Global Privacy Control está activado.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("由于已开启 Global Privacy Control，浏览器分析已关闭。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Global Privacy Control が有効なため、ブラウザ分析は無効です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Global Privacy Control이 켜져 있어 브라우저 분석이 꺼져 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("由於已啟用 Global Privacy Control，瀏覽器分析已停用。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Browser-Analysen sind deaktiviert, weil Global Privacy Control aktiviert ist.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les analyses du navigateur sont désactivées car Global Privacy Control est activé.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Аналітику браузера вимкнено, бо ввімкнено Global Privacy Control.")
	return /** @type {LocalizedString} */ ("Browser analytics are disabled because Global Privacy Control is enabled.")
});
export { docstelemetryglobalprivacycontrol4 as "docsTelemetryGlobalPrivacyControl" }