/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustorm5Inputs */

const en_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust ORM / database.`)
};

const es_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de datos Rust.`)
};

const zh_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust ORM / 数据库。`)
};

const ja_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust の ORM / データベース。`)
};

const ko_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust ORM / 데이터베이스.`)
};

const zh_hant1_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust ORM / 資料庫。`)
};

const de_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / Datenbank für Rust.`)
};

const fr_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de données Rust.`)
};

const uk_docsclisummaryrustrustorm5 = /** @type {(inputs: Docsclisummaryrustrustorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / база даних Rust.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustorm5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustorm5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustorm5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustorm5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustorm5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustorm5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustorm5(inputs)
	return en_docsclisummaryrustrustorm5(inputs)
});
export { docsclisummaryrustrustorm5 as "docsCliSummaryRustRustOrm" }