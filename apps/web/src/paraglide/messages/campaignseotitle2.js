/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignseotitle2Inputs */



/**
* | output |
* | --- |
* | "Run Before You Clone \| Better Fullstack" |
*
* @param {Campaignseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignseotitle2 = /** @type {((inputs?: Campaignseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecuta antes de clonar | Better Fullstack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("先运行，再克隆 | Better Fullstack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("クローンする前に実行 | Better Fullstack")
	if (locale === "ko") return /** @type {LocalizedString} */ ("클론하기 전에 실행하세요 | Better Fullstack")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("先執行，再複製 | Better Fullstack")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erst ausführen, dann klonen | Better Fullstack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécutez avant de cloner | Better Fullstack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запусти перед клонуванням | Better Fullstack")
	return /** @type {LocalizedString} */ ("Run Before You Clone | Better Fullstack")
});
export { campaignseotitle2 as "campaignSeoTitle" }