/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalwebframework6Inputs */



/**
* | output |
* | --- |
* | "Experimental Crystal HTTP framework." |
*
* @param {Docsclisummarycrystalcrystalwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystalwebframework6 = /** @type {((inputs?: Docsclisummarycrystalcrystalwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystalwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework HTTP experimental de Crystal.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实验性 Crystal HTTP 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実験的な Crystal HTTP フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실험적 Crystal HTTP 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("實驗性 Crystal HTTP 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Experimentelles Crystal-HTTP-Framework.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework HTTP expérimental Crystal.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Експериментальний HTTP-фреймворк Crystal.")
	return /** @type {LocalizedString} */ ("Experimental Crystal HTTP framework.")
});
export { docsclisummarycrystalcrystalwebframework6 as "docsCliSummaryCrystalCrystalWebFramework" }