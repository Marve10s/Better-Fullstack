/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystaltesting5Inputs */



/**
* | output |
* | --- |
* | "Experimental Crystal test tooling." |
*
* @param {Docsclisummarycrystalcrystaltesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystaltesting5 = /** @type {((inputs?: Docsclisummarycrystalcrystaltesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystaltesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramientas de pruebas experimentales de Crystal.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实验性 Crystal 测试工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実験的な Crystal テストツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실험적인 Crystal 테스트 도구입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("實驗性 Crystal 測試工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Experimentelle Crystal-Testwerkzeuge.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outils de test expérimentaux pour Crystal.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Експериментальні інструменти тестування Crystal.")
	return /** @type {LocalizedString} */ ("Experimental Crystal test tooling.")
});
export { docsclisummarycrystalcrystaltesting5 as "docsCliSummaryCrystalCrystalTesting" }