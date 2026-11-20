/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedatabaseintegrations2Inputs */



/**
* | output |
* | --- |
* | "Database integrations" |
*
* @param {Comparedatabaseintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparedatabaseintegrations2 = /** @type {((inputs?: Comparedatabaseintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedatabaseintegrations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Integraciones de base de datos")
	if (locale === "zh") return /** @type {LocalizedString} */ ("数据库集成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("データベースの統合")
	if (locale === "ko") return /** @type {LocalizedString} */ ("데이터베이스 통합")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("資料庫整合")
	if (locale === "de") return /** @type {LocalizedString} */ ("Datenbankintegrationen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Intégrations de bases de données")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інтеграція баз даних")
	return /** @type {LocalizedString} */ ("Database integrations")
});
export { comparedatabaseintegrations2 as "compareDatabaseIntegrations" }