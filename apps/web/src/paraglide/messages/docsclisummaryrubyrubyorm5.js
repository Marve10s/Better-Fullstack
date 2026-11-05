/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyorm5Inputs */

const en_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby ORM / database layer.`)
};

const es_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / capa de base de datos de Ruby.`)
};

const zh_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby ORM / 数据库层。`)
};

const ja_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby の ORM / データベース層。`)
};

const ko_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby ORM / 데이터베이스 계층.`)
};

const zh_hant1_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby ORM / 資料庫層。`)
};

const de_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-ORM / Datenbankschicht.`)
};

const fr_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / couche base de données Ruby.`)
};

const uk_docsclisummaryrubyrubyorm5 = /** @type {(inputs: Docsclisummaryrubyrubyorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / шар бази даних Ruby.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubyorm5(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubyorm5(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubyorm5(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubyorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubyorm5(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubyorm5(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubyorm5(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubyorm5(inputs)
	return en_docsclisummaryrubyrubyorm5(inputs)
});
export { docsclisummaryrubyrubyorm5 as "docsCliSummaryRubyRubyOrm" }