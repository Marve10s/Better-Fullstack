/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsteprun2Inputs */



/**
* | output |
* | --- |
* | "Run the real project" |
*
* @param {Campaignsteprun2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsteprun2 = /** @type {((inputs?: Campaignsteprun2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsteprun2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecuta el proyecto real")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行真实项目")
	if (locale === "ja") return /** @type {LocalizedString} */ ("本物のプロジェクトを実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실제 프로젝트 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行真實專案")
	if (locale === "de") return /** @type {LocalizedString} */ ("Führe das echte Projekt aus")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécutez le vrai projet")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запустіть справжній проєкт")
	return /** @type {LocalizedString} */ ("Run the real project")
});
export { campaignsteprun2 as "campaignStepRun" }