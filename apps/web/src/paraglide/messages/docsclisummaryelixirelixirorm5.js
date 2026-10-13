/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirorm5Inputs */

const en_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir ORM / database.`)
};

const es_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de datos Elixir.`)
};

const zh_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir ORM / 数据库。`)
};

const ja_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の ORM / データベース。`)
};

const ko_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir ORM / 데이터베이스.`)
};

const zh_hant1_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir ORM / 資料庫。`)
};

const de_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / Datenbank für Elixir.`)
};

const fr_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de données Elixir.`)
};

const uk_docsclisummaryelixirelixirorm5 = /** @type {(inputs: Docsclisummaryelixirelixirorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / база даних Elixir.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirorm5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirorm5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirorm5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirorm5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirorm5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirorm5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirorm5(inputs)
	return en_docsclisummaryelixirelixirorm5(inputs)
});
export { docsclisummaryelixirelixirorm5 as "docsCliSummaryElixirElixirOrm" }