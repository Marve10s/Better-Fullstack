/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirorm5Inputs */



/**
* | output |
* | --- |
* | "Elixir ORM / database." |
*
* @param {Docsclisummaryelixirelixirorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirorm5 = /** @type {((inputs?: Docsclisummaryelixirelixirorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORM / base de datos Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir ORM / 数据库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir の ORM / データベース。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir ORM / 데이터베이스.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir ORM / 資料庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("ORM / Datenbank für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM / base de données Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ORM / база даних Elixir.")
	return /** @type {LocalizedString} */ ("Elixir ORM / database.")
});
export { docsclisummaryelixirelixirorm5 as "docsCliSummaryElixirElixirOrm" }