/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphporm5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORM / capa de base de datos de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP ORM / 数据库层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP の ORM / データベース層。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP ORM / 데이터베이스 계층.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP ORM / 資料庫層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-ORM / Datenbankschicht.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM / couche de base de données PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ORM / шар бази даних PHP.")
	return /** @type {LocalizedString} */ ("PHP ORM / database layer.")
});
export { docsclisummaryphpphporm5 as "docsCliSummaryPhpPhpOrm" }