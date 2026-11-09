/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogomigrations5Inputs */



/**
* | output |
* | --- |
* | "Go database migrations." |
*
* @param {Docsclisummarygogomigrations5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogomigrations5 = /** @type {((inputs?: Docsclisummarygogomigrations5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogomigrations5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Migraciones de base de datos en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 数据库迁移。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のデータベースマイグレーション。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 데이터베이스 마이그레이션.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 資料庫遷移。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Datenbankmigrationen für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Migrations de base de données Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Міграції бази даних для Go.")
	return /** @type {LocalizedString} */ ("Go database migrations.")
});
export { docsclisummarygogomigrations5 as "docsCliSummaryGoGoMigrations" }