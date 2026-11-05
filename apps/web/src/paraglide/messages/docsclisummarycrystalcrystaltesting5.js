/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystaltesting5Inputs */

const en_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimental Crystal test tooling.`)
};

const es_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramientas de pruebas experimentales de Crystal.`)
};

const zh_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实验性 Crystal 测试工具。`)
};

const ja_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実験的な Crystal テストツール。`)
};

const ko_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험적인 Crystal 테스트 도구입니다.`)
};

const zh_hant1_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`實驗性 Crystal 測試工具。`)
};

const de_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimentelle Crystal-Testwerkzeuge.`)
};

const fr_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outils de test expérimentaux pour Crystal.`)
};

const uk_docsclisummarycrystalcrystaltesting5 = /** @type {(inputs: Docsclisummarycrystalcrystaltesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Експериментальні інструменти тестування Crystal.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycrystalcrystaltesting5(inputs)
	if (locale === "zh") return zh_docsclisummarycrystalcrystaltesting5(inputs)
	if (locale === "ja") return ja_docsclisummarycrystalcrystaltesting5(inputs)
	if (locale === "ko") return ko_docsclisummarycrystalcrystaltesting5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycrystalcrystaltesting5(inputs)
	if (locale === "de") return de_docsclisummarycrystalcrystaltesting5(inputs)
	if (locale === "fr") return fr_docsclisummarycrystalcrystaltesting5(inputs)
	if (locale === "uk") return uk_docsclisummarycrystalcrystaltesting5(inputs)
	return en_docsclisummarycrystalcrystaltesting5(inputs)
});
export { docsclisummarycrystalcrystaltesting5 as "docsCliSummaryCrystalCrystalTesting" }