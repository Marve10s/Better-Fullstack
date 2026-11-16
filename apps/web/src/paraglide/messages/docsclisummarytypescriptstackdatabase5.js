/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackdatabase5Inputs */



/**
* | output |
* | --- |
* | "Database engine." |
*
* @param {Docsclisummarytypescriptstackdatabase5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackdatabase5 = /** @type {((inputs?: Docsclisummarytypescriptstackdatabase5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackdatabase5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Motor de base de datos.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("数据库引擎。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("データベースエンジン。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("데이터베이스 엔진.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("資料庫引擎。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Datenbank-Engine.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Moteur de base de données.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Рушій бази даних.")
	return /** @type {LocalizedString} */ ("Database engine.")
});
export { docsclisummarytypescriptstackdatabase5 as "docsCliSummaryTypescriptStackDatabase" }