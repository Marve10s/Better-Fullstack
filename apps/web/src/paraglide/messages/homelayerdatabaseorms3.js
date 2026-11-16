/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerdatabaseorms3Inputs */



/**
* | output |
* | --- |
* | "DATABASE ORMs" |
*
* @param {Homelayerdatabaseorms3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelayerdatabaseorms3 = /** @type {((inputs?: Homelayerdatabaseorms3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerdatabaseorms3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ORMs DE BASE DE DATOS")
	if (locale === "zh") return /** @type {LocalizedString} */ ("数据库 ORM")
	if (locale === "ja") return /** @type {LocalizedString} */ ("データベース ORM")
	if (locale === "ko") return /** @type {LocalizedString} */ ("데이터베이스 ORM")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("資料庫 ORM")
	if (locale === "de") return /** @type {LocalizedString} */ ("DATENBANK-ORMs")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ORM DE BASE DE DONNÉES")
	if (locale === "uk") return /** @type {LocalizedString} */ ("БАЗИ ДАНИХ ТА ORM")
	return /** @type {LocalizedString} */ ("DATABASE ORMs")
});
export { homelayerdatabaseorms3 as "homeLayerDatabaseOrms" }