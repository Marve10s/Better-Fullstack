/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignrunstack2Inputs */



/**
* | output |
* | --- |
* | "Run a stack" |
*
* @param {Campaignrunstack2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignrunstack2 = /** @type {((inputs?: Campaignrunstack2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignrunstack2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecutar un stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行一个技术栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタックを実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택 실행하기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行一個技術棧")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stack ausführen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécuter un stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запустити стек")
	return /** @type {LocalizedString} */ ("Run a stack")
});
export { campaignrunstack2 as "campaignRunStack" }