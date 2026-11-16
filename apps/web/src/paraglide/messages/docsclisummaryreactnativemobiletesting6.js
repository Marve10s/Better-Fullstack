/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobiletesting6Inputs */



/**
* | output |
* | --- |
* | "Mobile testing setup." |
*
* @param {Docsclisummaryreactnativemobiletesting6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobiletesting6 = /** @type {((inputs?: Docsclisummaryreactnativemobiletesting6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobiletesting6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configuración de pruebas móviles.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("移动端测试配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("モバイルのテストセットアップ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모바일 테스트 설정.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("行動裝置測試設定。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testeinrichtung für mobile Apps.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configuration des tests mobiles.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштування мобільного тестування.")
	return /** @type {LocalizedString} */ ("Mobile testing setup.")
});
export { docsclisummaryreactnativemobiletesting6 as "docsCliSummaryReactNativeMobileTesting" }