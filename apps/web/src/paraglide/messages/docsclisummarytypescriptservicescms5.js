/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicescms5Inputs */



/**
* | output |
* | --- |
* | "Content management system." |
*
* @param {Docsclisummarytypescriptservicescms5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicescms5 = /** @type {((inputs?: Docsclisummarytypescriptservicescms5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicescms5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Sistema de gestión de contenido.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("内容管理系统。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コンテンツ管理システム。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("콘텐츠 관리 시스템.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("內容管理系統。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Content-Management-System.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Système de gestion de contenu.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Система керування вмістом.")
	return /** @type {LocalizedString} */ ("Content management system.")
});
export { docsclisummarytypescriptservicescms5 as "docsCliSummaryTypescriptServicesCms" }