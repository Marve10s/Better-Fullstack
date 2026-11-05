/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalorm5Inputs */

const en_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimental Crystal database layer.`)
};

const es_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Capa de base de datos experimental de Crystal.`)
};

const zh_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实验性 Crystal 数据库层。`)
};

const ja_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実験的な Crystal データベース層。`)
};

const ko_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험적인 Crystal 데이터베이스 계층입니다.`)
};

const zh_hant1_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`實驗性 Crystal 資料庫層。`)
};

const de_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimentelle Crystal-Datenbankschicht.`)
};

const fr_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couche de base de données expérimentale Crystal.`)
};

const uk_docsclisummarycrystalcrystalorm5 = /** @type {(inputs: Docsclisummarycrystalcrystalorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Експериментальний шар бази даних Crystal.`)
};

/**
* | output |
* | --- |
* | "Experimental Crystal database layer." |
*
* @param {Docsclisummarycrystalcrystalorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystalorm5 = /** @type {((inputs?: Docsclisummarycrystalcrystalorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystalorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycrystalcrystalorm5(inputs)
	if (locale === "zh") return zh_docsclisummarycrystalcrystalorm5(inputs)
	if (locale === "ja") return ja_docsclisummarycrystalcrystalorm5(inputs)
	if (locale === "ko") return ko_docsclisummarycrystalcrystalorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycrystalcrystalorm5(inputs)
	if (locale === "de") return de_docsclisummarycrystalcrystalorm5(inputs)
	if (locale === "fr") return fr_docsclisummarycrystalcrystalorm5(inputs)
	if (locale === "uk") return uk_docsclisummarycrystalcrystalorm5(inputs)
	return en_docsclisummarycrystalcrystalorm5(inputs)
});
export { docsclisummarycrystalcrystalorm5 as "docsCliSummaryCrystalCrystalOrm" }