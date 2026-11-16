/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignrunthisstack3Inputs */



/**
* | output |
* | --- |
* | "Run this stack" |
*
* @param {Campaignrunthisstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignrunthisstack3 = /** @type {((inputs?: Campaignrunthisstack3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignrunthisstack3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecutar este stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行这个技术栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このスタックを実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 스택 실행하기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行這個技術棧")
	if (locale === "de") return /** @type {LocalizedString} */ ("Diesen Stack ausführen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécuter ce stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запустити цей стек")
	return /** @type {LocalizedString} */ ("Run this stack")
});
export { campaignrunthisstack3 as "campaignRunThisStack" }