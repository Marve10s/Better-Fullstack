/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignogalt2Inputs */



/**
* | output |
* | --- |
* | "Run Before You Clone with Better Fullstack" |
*
* @param {Campaignogalt2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignogalt2 = /** @type {((inputs?: Campaignogalt2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignogalt2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecuta antes de clonar con Better Fullstack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用 Better Fullstack，先运行再克隆")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Better Fullstack でクローンする前に実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Better Fullstack과 함께, 클론하기 전에 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用 Better Fullstack，先執行再複製")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erst ausführen, dann klonen – mit Better Fullstack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécutez avant de cloner avec Better Fullstack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запусти перед клонуванням із Better Fullstack")
	return /** @type {LocalizedString} */ ("Run Before You Clone with Better Fullstack")
});
export { campaignogalt2 as "campaignOgAlt" }