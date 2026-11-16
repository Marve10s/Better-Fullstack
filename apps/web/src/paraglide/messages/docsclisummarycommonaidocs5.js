/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonaidocs5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Archivos de instrucciones para agentes que se generarán.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("要生成的代理指令文件。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成するエージェント向け指示ファイル。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성할 에이전트 지침 파일.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("要產生的代理指令檔案。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zu generierende Anweisungsdateien für Agenten.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fichiers d’instructions pour agents à générer.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Файли інструкцій для агентів, які потрібно згенерувати.")
	return /** @type {LocalizedString} */ ("Agent instruction files to generate.")
});
export { docsclisummarycommonaidocs5 as "docsCliSummaryCommonAiDocs" }