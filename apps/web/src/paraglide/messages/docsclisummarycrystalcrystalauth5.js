/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalauth5Inputs */



/**
* | output |
* | --- |
* | "Experimental Crystal authentication." |
*
* @param {Docsclisummarycrystalcrystalauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystalauth5 = /** @type {((inputs?: Docsclisummarycrystalcrystalauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystalauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación experimental de Crystal.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实验性 Crystal 身份验证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実験的な Crystal 認証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실험적인 Crystal 인증입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("實驗性 Crystal 身分驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Experimentelle Crystal-Authentifizierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification expérimentale Crystal.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Експериментальна автентифікація Crystal.")
	return /** @type {LocalizedString} */ ("Experimental Crystal authentication.")
});
export { docsclisummarycrystalcrystalauth5 as "docsCliSummaryCrystalCrystalAuth" }