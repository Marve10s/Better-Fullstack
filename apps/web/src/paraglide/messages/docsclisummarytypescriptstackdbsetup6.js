/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackdbsetup6Inputs */

const en_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hosted database provider setup.`)
};

const es_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración del proveedor de base de datos alojada.`)
};

const zh_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`托管数据库服务商配置。`)
};

const ja_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ホスト型データベースプロバイダーのセットアップ。`)
};

const ko_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`호스팅 데이터베이스 제공자 설정.`)
};

const zh_hant1_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`託管資料庫服務商設定。`)
};

const de_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Einrichtung des Anbieters einer gehosteten Datenbank.`)
};

const fr_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuration du fournisseur de base de données hébergée.`)
};

const uk_docsclisummarytypescriptstackdbsetup6 = /** @type {(inputs: Docsclisummarytypescriptstackdbsetup6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштування провайдера розміщеної бази даних.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackdbsetup6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackdbsetup6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackdbsetup6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackdbsetup6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackdbsetup6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackdbsetup6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackdbsetup6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackdbsetup6(inputs)
	return en_docsclisummarytypescriptstackdbsetup6(inputs)
});
export { docsclisummarytypescriptstackdbsetup6 as "docsCliSummaryTypescriptStackDbSetup" }