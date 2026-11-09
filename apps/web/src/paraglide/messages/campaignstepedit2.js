/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepedit2Inputs */



/**
* | output |
* | --- |
* | "Change the source" |
*
* @param {Campaignstepedit2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepedit2 = /** @type {((inputs?: Campaignstepedit2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepedit2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cambia el código")
	if (locale === "zh") return /** @type {LocalizedString} */ ("修改源码")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ソースを変更")
	if (locale === "ko") return /** @type {LocalizedString} */ ("소스 수정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("修改原始碼")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ändere den Quellcode")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Modifiez le code source")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Змініть код")
	return /** @type {LocalizedString} */ ("Change the source")
});
export { campaignstepedit2 as "campaignStepEdit" }