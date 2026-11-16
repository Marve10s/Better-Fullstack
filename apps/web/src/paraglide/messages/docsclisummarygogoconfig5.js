/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoconfig5Inputs */



/**
* | output |
* | --- |
* | "Go config loader." |
*
* @param {Docsclisummarygogoconfig5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoconfig5 = /** @type {((inputs?: Docsclisummarygogoconfig5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoconfig5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cargador de configuración Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 配置加载器。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go の設定ローダー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 설정 로더.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 設定載入器。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Konfigurationslader für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Chargeur de configuration Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Завантажувач конфігурації Go.")
	return /** @type {LocalizedString} */ ("Go config loader.")
});
export { docsclisummarygogoconfig5 as "docsCliSummaryGoGoConfig" }