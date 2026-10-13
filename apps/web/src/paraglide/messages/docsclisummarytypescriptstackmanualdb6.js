/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackmanualdb6Inputs */

const en_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skip provider-specific database setup prompts.`)
};

const es_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Omitir las preguntas de configuración de base de datos específicas del proveedor.`)
};

const zh_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`跳过特定服务商的数据库配置提示。`)
};

const ja_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロバイダー固有のデータベースセットアップのプロンプトをスキップします。`)
};

const ko_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제공자별 데이터베이스 설정 프롬프트를 건너뜁니다.`)
};

const zh_hant1_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`略過特定服務商的資料庫設定提示。`)
};

const de_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anbieterspezifische Fragen zur Datenbankeinrichtung überspringen.`)
};

const fr_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignorer les questions de configuration de base de données propres au fournisseur.`)
};

const uk_docsclisummarytypescriptstackmanualdb6 = /** @type {(inputs: Docsclisummarytypescriptstackmanualdb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Пропустити запитання про налаштування бази даних для конкретного провайдера.`)
};

/**
* | output |
* | --- |
* | "Skip provider-specific database setup prompts." |
*
* @param {Docsclisummarytypescriptstackmanualdb6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackmanualdb6 = /** @type {((inputs?: Docsclisummarytypescriptstackmanualdb6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackmanualdb6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackmanualdb6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackmanualdb6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackmanualdb6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackmanualdb6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackmanualdb6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackmanualdb6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackmanualdb6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackmanualdb6(inputs)
	return en_docsclisummarytypescriptstackmanualdb6(inputs)
});
export { docsclisummarytypescriptstackmanualdb6 as "docsCliSummaryTypescriptStackManualDb" }