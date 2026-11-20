/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackdbsetup6Inputs */



/**
* | output |
* | --- |
* | "Hosted database provider setup." |
*
* @param {Docsclisummarytypescriptstackdbsetup6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackdbsetup6 = /** @type {((inputs?: Docsclisummarytypescriptstackdbsetup6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackdbsetup6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configuración del proveedor de base de datos alojada.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("托管数据库服务商配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ホスト型データベースプロバイダーのセットアップ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("호스팅 데이터베이스 제공자 설정.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("託管資料庫服務商設定。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Einrichtung des Anbieters einer gehosteten Datenbank.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configuration du fournisseur de base de données hébergée.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштування провайдера розміщеної бази даних.")
	return /** @type {LocalizedString} */ ("Hosted database provider setup.")
});
export { docsclisummarytypescriptstackdbsetup6 as "docsCliSummaryTypescriptStackDbSetup" }