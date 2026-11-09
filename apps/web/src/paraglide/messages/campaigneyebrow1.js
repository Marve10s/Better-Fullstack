/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigneyebrow1Inputs */



/**
* | output |
* | --- |
* | "Run before you clone" |
*
* @param {Campaigneyebrow1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigneyebrow1 = /** @type {((inputs?: Campaigneyebrow1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigneyebrow1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecuta antes de clonar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("先运行，再克隆")
	if (locale === "ja") return /** @type {LocalizedString} */ ("クローンする前に実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("클론하기 전에 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("先執行，再複製")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erst ausführen, dann klonen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécutez avant de cloner")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запусти перед клонуванням")
	return /** @type {LocalizedString} */ ("Run before you clone")
});
export { campaigneyebrow1 as "campaignEyebrow" }