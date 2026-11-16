/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonorm5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORM / base de datos Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python ORM / 数据库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の ORM / データベース。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python ORM / 데이터베이스.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python ORM / 資料庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("ORM / Datenbank für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM / base de données Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ORM / база даних Python.")
	return /** @type {LocalizedString} */ ("Python ORM / database.")
});
export { docsclisummarypythonpythonorm5 as "docsCliSummaryPythonPythonOrm" }