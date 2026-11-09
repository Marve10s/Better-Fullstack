/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigntitle1Inputs */



/**
* | output |
* | --- |
* | "Don't trust a starter you can't run." |
*
* @param {Campaigntitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigntitle1 = /** @type {((inputs?: Campaigntitle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigntitle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No confíes en un starter que no puedes ejecutar.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("不要相信一个你无法运行的模板。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実行できないスターターを信用してはいけない。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실행해 볼 수 없는 스타터는 믿지 마세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("不要相信一個你無法執行的範本。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Trau keinem Starter, den du nicht ausführen kannst.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ne faites pas confiance à un starter que vous ne pouvez pas exécuter.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не довіряйте стартеру, який не можете запустити.")
	return /** @type {LocalizedString} */ ("Don't trust a starter you can't run.")
});
export { campaigntitle1 as "campaignTitle" }