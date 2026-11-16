/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoorm5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORM / base de datos Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go ORM / 数据库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go の ORM / データベース。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go ORM / 데이터베이스.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go ORM / 資料庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("ORM / Datenbank für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM / base de données Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ORM / база даних Go.")
	return /** @type {LocalizedString} */ ("Go ORM / database.")
});
export { docsclisummarygogoorm5 as "docsCliSummaryGoGoOrm" }