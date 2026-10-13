/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackdatabase5Inputs */

const en_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Database engine.`)
};

const es_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Motor de base de datos.`)
};

const zh_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据库引擎。`)
};

const ja_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`データベースエンジン。`)
};

const ko_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`데이터베이스 엔진.`)
};

const zh_hant1_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`資料庫引擎。`)
};

const de_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datenbank-Engine.`)
};

const fr_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Moteur de base de données.`)
};

const uk_docsclisummarytypescriptstackdatabase5 = /** @type {(inputs: Docsclisummarytypescriptstackdatabase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Рушій бази даних.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackdatabase5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackdatabase5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackdatabase5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackdatabase5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackdatabase5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackdatabase5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackdatabase5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackdatabase5(inputs)
	return en_docsclisummarytypescriptstackdatabase5(inputs)
});
export { docsclisummarytypescriptstackdatabase5 as "docsCliSummaryTypescriptStackDatabase" }