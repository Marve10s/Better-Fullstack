/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignshareruncomplete3Inputs */



/**
* | output |
* | --- |
* | "Stack running" |
*
* @param {Campaignshareruncomplete3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignshareruncomplete3 = /** @type {((inputs?: Campaignshareruncomplete3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignshareruncomplete3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Stack en ejecución")
	if (locale === "zh") return /** @type {LocalizedString} */ ("技术栈运行中")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタック実行中")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택 실행 중")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("技術棧執行中")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stack läuft")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Stack en cours d'exécution")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Стек запущено")
	return /** @type {LocalizedString} */ ("Stack running")
});
export { campaignshareruncomplete3 as "campaignShareRunComplete" }