/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyorm5Inputs */



/**
* | output |
* | --- |
* | "Ruby ORM / database layer." |
*
* @param {Docsclisummaryrubyrubyorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubyorm5 = /** @type {((inputs?: Docsclisummaryrubyrubyorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubyorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORM / capa de base de datos de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby ORM / 数据库层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby の ORM / データベース層。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby ORM / 데이터베이스 계층.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby ORM / 資料庫層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-ORM / Datenbankschicht.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM / couche base de données Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ORM / шар бази даних Ruby.")
	return /** @type {LocalizedString} */ ("Ruby ORM / database layer.")
});
export { docsclisummaryrubyrubyorm5 as "docsCliSummaryRubyRubyOrm" }