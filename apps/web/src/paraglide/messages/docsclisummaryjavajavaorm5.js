/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavaorm5Inputs */

const en_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java ORM / database.`)
};

const es_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de datos Java.`)
};

const zh_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java ORM / 数据库。`)
};

const ja_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java の ORM / データベース。`)
};

const ko_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java ORM / 데이터베이스.`)
};

const zh_hant1_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java ORM / 資料庫。`)
};

const de_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / Datenbank für Java.`)
};

const fr_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de données Java.`)
};

const uk_docsclisummaryjavajavaorm5 = /** @type {(inputs: Docsclisummaryjavajavaorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / база даних Java.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavaorm5(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavaorm5(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavaorm5(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavaorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavaorm5(inputs)
	if (locale === "de") return de_docsclisummaryjavajavaorm5(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavaorm5(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavaorm5(inputs)
	return en_docsclisummaryjavajavaorm5(inputs)
});
export { docsclisummaryjavajavaorm5 as "docsCliSummaryJavaJavaOrm" }