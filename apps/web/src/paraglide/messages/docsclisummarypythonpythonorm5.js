/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonorm5Inputs */

const en_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python ORM / database.`)
};

const es_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de datos Python.`)
};

const zh_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python ORM / 数据库。`)
};

const ja_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の ORM / データベース。`)
};

const ko_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python ORM / 데이터베이스.`)
};

const zh_hant1_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python ORM / 資料庫。`)
};

const de_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / Datenbank für Python.`)
};

const fr_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / base de données Python.`)
};

const uk_docsclisummarypythonpythonorm5 = /** @type {(inputs: Docsclisummarypythonpythonorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / база даних Python.`)
};

/**
* | output |
* | --- |
* | "Python ORM / database." |
*
* @param {Docsclisummarypythonpythonorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonorm5 = /** @type {((inputs?: Docsclisummarypythonpythonorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonorm5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonorm5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonorm5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonorm5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonorm5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonorm5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonorm5(inputs)
	return en_docsclisummarypythonpythonorm5(inputs)
});
export { docsclisummarypythonpythonorm5 as "docsCliSummaryPythonPythonOrm" }