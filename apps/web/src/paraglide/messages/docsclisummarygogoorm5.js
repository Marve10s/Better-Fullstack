/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoorm5Inputs */

const en_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go ORM / database.`)
};

const es_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de datos Go.`)
};

const zh_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go ORM / 数据库。`)
};

const ja_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go の ORM / データベース。`)
};

const ko_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go ORM / 데이터베이스.`)
};

const zh_hant1_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go ORM / 資料庫。`)
};

const de_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / Datenbank für Go.`)
};

const fr_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de données Go.`)
};

const uk_docsclisummarygogoorm5 = /** @type {(inputs: Docsclisummarygogoorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / база даних Go.`)
};

/**
* | output |
* | --- |
* | "Go ORM / database." |
*
* @param {Docsclisummarygogoorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoorm5 = /** @type {((inputs?: Docsclisummarygogoorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogoorm5(inputs)
	if (locale === "zh") return zh_docsclisummarygogoorm5(inputs)
	if (locale === "ja") return ja_docsclisummarygogoorm5(inputs)
	if (locale === "ko") return ko_docsclisummarygogoorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogoorm5(inputs)
	if (locale === "de") return de_docsclisummarygogoorm5(inputs)
	if (locale === "fr") return fr_docsclisummarygogoorm5(inputs)
	if (locale === "uk") return uk_docsclisummarygogoorm5(inputs)
	return en_docsclisummarygogoorm5(inputs)
});
export { docsclisummarygogoorm5 as "docsCliSummaryGoGoOrm" }