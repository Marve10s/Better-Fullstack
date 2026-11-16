/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignnosignup2Inputs */



/**
* | output |
* | --- |
* | "No signup" |
*
* @param {Campaignnosignup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignnosignup2 = /** @type {((inputs?: Campaignnosignup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignnosignup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Sin registro")
	if (locale === "zh") return /** @type {LocalizedString} */ ("无需注册")
	if (locale === "ja") return /** @type {LocalizedString} */ ("登録不要")
	if (locale === "ko") return /** @type {LocalizedString} */ ("가입 불필요")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("無需註冊")
	if (locale === "de") return /** @type {LocalizedString} */ ("Keine Anmeldung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sans inscription")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Без реєстрації")
	return /** @type {LocalizedString} */ ("No signup")
});
export { campaignnosignup2 as "campaignNoSignup" }