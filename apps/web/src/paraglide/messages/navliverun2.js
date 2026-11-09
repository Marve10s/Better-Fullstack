/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navliverun2Inputs */



/**
* | output |
* | --- |
* | "Live Run" |
*
* @param {Navliverun2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navliverun2 = /** @type {((inputs?: Navliverun2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navliverun2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecución en vivo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在线运行")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ライブ実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("라이브 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("線上執行")
	if (locale === "de") return /** @type {LocalizedString} */ ("Live-Run")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécution en direct")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Живий запуск")
	return /** @type {LocalizedString} */ ("Live Run")
});
export { navliverun2 as "navLiveRun" }