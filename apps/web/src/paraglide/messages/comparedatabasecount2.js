/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparedatabasecount2Inputs */



/**
* | output |
* | --- |
* | "{count} databases" |
*
* @param {Comparedatabasecount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparedatabasecount2 = /** @type {((inputs: Comparedatabasecount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedatabasecount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} bases de datos`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个数据库`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} データベース`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 데이터베이스`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個資料庫`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Datenbanken`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} bases de données`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} баз даних`)
	return /** @type {LocalizedString} */ (`${i?.count} databases`)
});
export { comparedatabasecount2 as "compareDatabaseCount" }