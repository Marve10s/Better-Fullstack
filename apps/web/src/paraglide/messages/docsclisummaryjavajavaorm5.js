/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavaorm5Inputs */



/**
* | output |
* | --- |
* | "Java ORM / database." |
*
* @param {Docsclisummaryjavajavaorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavaorm5 = /** @type {((inputs?: Docsclisummaryjavajavaorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavaorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORM / base de datos Java.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Java ORM / 数据库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Java の ORM / データベース。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Java ORM / 데이터베이스.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Java ORM / 資料庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("ORM / Datenbank für Java.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM / base de données Java.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ORM / база даних Java.")
	return /** @type {LocalizedString} */ ("Java ORM / database.")
});
export { docsclisummaryjavajavaorm5 as "docsCliSummaryJavaJavaOrm" }