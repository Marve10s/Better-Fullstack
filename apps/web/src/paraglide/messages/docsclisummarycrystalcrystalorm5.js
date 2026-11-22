/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalorm5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Capa de base de datos experimental de Crystal.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实验性 Crystal 数据库层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実験的な Crystal データベース層。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실험적인 Crystal 데이터베이스 계층입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("實驗性 Crystal 資料庫層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Experimentelle Crystal-Datenbankschicht.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Couche de base de données expérimentale Crystal.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Експериментальний шар бази даних Crystal.")
	return /** @type {LocalizedString} */ ("Experimental Crystal database layer.")
});
export { docsclisummarycrystalcrystalorm5 as "docsCliSummaryCrystalCrystalOrm" }