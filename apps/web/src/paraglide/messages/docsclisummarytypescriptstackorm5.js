/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackorm5Inputs */



/**
* | output |
* | --- |
* | "ORM / query layer." |
*
* @param {Docsclisummarytypescriptstackorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackorm5 = /** @type {((inputs?: Docsclisummarytypescriptstackorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORM / capa de consultas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("ORM / 查询层。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ORM / クエリレイヤー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("ORM / 쿼리 계층.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("ORM / 查詢層。")
	if (locale === "de") return /** @type {LocalizedString} */ ("ORM / Abfrageschicht.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM / couche de requêtes.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ORM / шар запитів.")
	return /** @type {LocalizedString} */ ("ORM / query layer.")
});
export { docsclisummarytypescriptstackorm5 as "docsCliSummaryTypescriptStackOrm" }