/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalvalidation5Inputs */

const en_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimental Crystal input validation.`)
};

const es_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validación de entrada experimental de Crystal.`)
};

const zh_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实验性 Crystal 输入验证。`)
};

const ja_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実験的な Crystal 入力検証。`)
};

const ko_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험적인 Crystal 입력 검증입니다.`)
};

const zh_hant1_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`實驗性 Crystal 輸入驗證。`)
};

const de_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimentelle Crystal-Eingabevalidierung.`)
};

const fr_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validation expérimentale des entrées Crystal.`)
};

const uk_docsclisummarycrystalcrystalvalidation5 = /** @type {(inputs: Docsclisummarycrystalcrystalvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Експериментальна перевірка вхідних даних Crystal.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycrystalcrystalvalidation5(inputs)
	if (locale === "zh") return zh_docsclisummarycrystalcrystalvalidation5(inputs)
	if (locale === "ja") return ja_docsclisummarycrystalcrystalvalidation5(inputs)
	if (locale === "ko") return ko_docsclisummarycrystalcrystalvalidation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycrystalcrystalvalidation5(inputs)
	if (locale === "de") return de_docsclisummarycrystalcrystalvalidation5(inputs)
	if (locale === "fr") return fr_docsclisummarycrystalcrystalvalidation5(inputs)
	if (locale === "uk") return uk_docsclisummarycrystalcrystalvalidation5(inputs)
	return en_docsclisummarycrystalcrystalvalidation5(inputs)
});
export { docsclisummarycrystalcrystalvalidation5 as "docsCliSummaryCrystalCrystalValidation" }