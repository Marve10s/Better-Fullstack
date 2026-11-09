/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalvalidation5Inputs */



/**
* | output |
* | --- |
* | "Experimental Crystal input validation." |
*
* @param {Docsclisummarycrystalcrystalvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystalvalidation5 = /** @type {((inputs?: Docsclisummarycrystalcrystalvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystalvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Validación de entrada experimental de Crystal.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实验性 Crystal 输入验证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実験的な Crystal 入力検証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실험적인 Crystal 입력 검증입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("實驗性 Crystal 輸入驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Experimentelle Crystal-Eingabevalidierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Validation expérimentale des entrées Crystal.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Експериментальна перевірка вхідних даних Crystal.")
	return /** @type {LocalizedString} */ ("Experimental Crystal input validation.")
});
export { docsclisummarycrystalcrystalvalidation5 as "docsCliSummaryCrystalCrystalValidation" }