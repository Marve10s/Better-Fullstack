/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonaidocs5Inputs */

const en_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent instruction files to generate.`)
};

const es_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Archivos de instrucciones para agentes que se generarán.`)
};

const zh_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要生成的代理指令文件。`)
};

const ja_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成するエージェント向け指示ファイル。`)
};

const ko_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성할 에이전트 지침 파일.`)
};

const zh_hant1_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要產生的代理指令檔案。`)
};

const de_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zu generierende Anweisungsdateien für Agenten.`)
};

const fr_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fichiers d’instructions pour agents à générer.`)
};

const uk_docsclisummarycommonaidocs5 = /** @type {(inputs: Docsclisummarycommonaidocs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Файли інструкцій для агентів, які потрібно згенерувати.`)
};

/**
* | output |
* | --- |
* | "Agent instruction files to generate." |
*
* @param {Docsclisummarycommonaidocs5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonaidocs5 = /** @type {((inputs?: Docsclisummarycommonaidocs5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonaidocs5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonaidocs5(inputs)
	if (locale === "zh") return zh_docsclisummarycommonaidocs5(inputs)
	if (locale === "ja") return ja_docsclisummarycommonaidocs5(inputs)
	if (locale === "ko") return ko_docsclisummarycommonaidocs5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonaidocs5(inputs)
	if (locale === "de") return de_docsclisummarycommonaidocs5(inputs)
	if (locale === "fr") return fr_docsclisummarycommonaidocs5(inputs)
	if (locale === "uk") return uk_docsclisummarycommonaidocs5(inputs)
	return en_docsclisummarycommonaidocs5(inputs)
});
export { docsclisummarycommonaidocs5 as "docsCliSummaryCommonAiDocs" }