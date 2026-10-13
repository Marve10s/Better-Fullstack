/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogomigrations5Inputs */

const en_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go database migrations.`)
};

const es_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Migraciones de base de datos en Go.`)
};

const zh_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 数据库迁移。`)
};

const ja_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のデータベースマイグレーション。`)
};

const ko_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 데이터베이스 마이그레이션.`)
};

const zh_hant1_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 資料庫遷移。`)
};

const de_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datenbankmigrationen für Go.`)
};

const fr_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Migrations de base de données Go.`)
};

const uk_docsclisummarygogomigrations5 = /** @type {(inputs: Docsclisummarygogomigrations5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Міграції бази даних для Go.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogomigrations5(inputs)
	if (locale === "zh") return zh_docsclisummarygogomigrations5(inputs)
	if (locale === "ja") return ja_docsclisummarygogomigrations5(inputs)
	if (locale === "ko") return ko_docsclisummarygogomigrations5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogomigrations5(inputs)
	if (locale === "de") return de_docsclisummarygogomigrations5(inputs)
	if (locale === "fr") return fr_docsclisummarygogomigrations5(inputs)
	if (locale === "uk") return uk_docsclisummarygogomigrations5(inputs)
	return en_docsclisummarygogomigrations5(inputs)
});
export { docsclisummarygogomigrations5 as "docsCliSummaryGoGoMigrations" }