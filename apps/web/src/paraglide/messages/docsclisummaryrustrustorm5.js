/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustorm5Inputs */



/**
* | output |
* | --- |
* | "Rust ORM / database." |
*
* @param {Docsclisummaryrustrustorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustorm5 = /** @type {((inputs?: Docsclisummaryrustrustorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORM / base de datos Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust ORM / 数据库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust の ORM / データベース。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust ORM / 데이터베이스.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust ORM / 資料庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("ORM / Datenbank für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM / base de données Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ORM / база даних Rust.")
	return /** @type {LocalizedString} */ ("Rust ORM / database.")
});
export { docsclisummaryrustrustorm5 as "docsCliSummaryRustRustOrm" }