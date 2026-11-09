/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuitesting5Inputs */



/**
* | output |
* | --- |
* | "Testing setup." |
*
* @param {Docsclisummarytypescriptuitesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuitesting5 = /** @type {((inputs?: Docsclisummarytypescriptuitesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuitesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configuración de pruebas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("测试配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("テストのセットアップ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("테스트 설정.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("測試設定。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testeinrichtung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configuration des tests.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштування тестування.")
	return /** @type {LocalizedString} */ ("Testing setup.")
});
export { docsclisummarytypescriptuitesting5 as "docsCliSummaryTypescriptUiTesting" }