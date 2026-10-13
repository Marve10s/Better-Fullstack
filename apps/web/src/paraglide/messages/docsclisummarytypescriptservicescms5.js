/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicescms5Inputs */

const en_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Content management system.`)
};

const es_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sistema de gestión de contenido.`)
};

const zh_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`内容管理系统。`)
};

const ja_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コンテンツ管理システム。`)
};

const ko_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`콘텐츠 관리 시스템.`)
};

const zh_hant1_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`內容管理系統。`)
};

const de_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Content-Management-System.`)
};

const fr_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Système de gestion de contenu.`)
};

const uk_docsclisummarytypescriptservicescms5 = /** @type {(inputs: Docsclisummarytypescriptservicescms5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Система керування вмістом.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicescms5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicescms5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicescms5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicescms5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicescms5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicescms5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicescms5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicescms5(inputs)
	return en_docsclisummarytypescriptservicescms5(inputs)
});
export { docsclisummarytypescriptservicescms5 as "docsCliSummaryTypescriptServicesCms" }