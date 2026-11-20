/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepdownload2Inputs */



/**
* | output |
* | --- |
* | "Take the code" |
*
* @param {Campaignstepdownload2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepdownload2 = /** @type {((inputs?: Campaignstepdownload2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepdownload2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Llévate el código")
	if (locale === "zh") return /** @type {LocalizedString} */ ("带走代码")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コードを持ち帰る")
	if (locale === "ko") return /** @type {LocalizedString} */ ("코드 가져가기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("帶走程式碼")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nimm den Code mit")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Emportez le code")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Заберіть код")
	return /** @type {LocalizedString} */ ("Take the code")
});
export { campaignstepdownload2 as "campaignStepDownload" }