/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesvectordb6Inputs */



/**
* | output |
* | --- |
* | "Vector database." |
*
* @param {Docsclisummarytypescriptservicesvectordb6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesvectordb6 = /** @type {((inputs?: Docsclisummarytypescriptservicesvectordb6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesvectordb6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Base de datos vectorial.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("向量数据库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ベクトルデータベース。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("벡터 데이터베이스.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("向量資料庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vektordatenbank.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Base de données vectorielle.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Векторна база даних.")
	return /** @type {LocalizedString} */ ("Vector database.")
});
export { docsclisummarytypescriptservicesvectordb6 as "docsCliSummaryTypescriptServicesVectorDb" }