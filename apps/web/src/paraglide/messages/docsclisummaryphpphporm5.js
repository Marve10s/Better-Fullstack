/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphporm5Inputs */

const en_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP ORM / database layer.`)
};

const es_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / capa de base de datos de PHP.`)
};

const zh_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP ORM / 数据库层。`)
};

const ja_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP の ORM / データベース層。`)
};

const ko_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP ORM / 데이터베이스 계층.`)
};

const zh_hant1_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP ORM / 資料庫層。`)
};

const de_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-ORM / Datenbankschicht.`)
};

const fr_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / couche de base de données PHP.`)
};

const uk_docsclisummaryphpphporm5 = /** @type {(inputs: Docsclisummaryphpphporm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / шар бази даних PHP.`)
};

/**
* | output |
* | --- |
* | "PHP ORM / database layer." |
*
* @param {Docsclisummaryphpphporm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphporm5 = /** @type {((inputs?: Docsclisummaryphpphporm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphporm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphporm5(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphporm5(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphporm5(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphporm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphporm5(inputs)
	if (locale === "de") return de_docsclisummaryphpphporm5(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphporm5(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphporm5(inputs)
	return en_docsclisummaryphpphporm5(inputs)
});
export { docsclisummaryphpphporm5 as "docsCliSummaryPhpPhpOrm" }