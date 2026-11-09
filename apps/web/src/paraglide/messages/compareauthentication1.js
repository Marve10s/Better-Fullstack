/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareauthentication1Inputs */



/**
* | output |
* | --- |
* | "Authentication" |
*
* @param {Compareauthentication1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareauthentication1 = /** @type {((inputs?: Compareauthentication1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareauthentication1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación")
	if (locale === "zh") return /** @type {LocalizedString} */ ("认证")
	if (locale === "ja") return /** @type {LocalizedString} */ ("認証")
	if (locale === "ko") return /** @type {LocalizedString} */ ("인증")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("認證")
	if (locale === "de") return /** @type {LocalizedString} */ ("Authentifizierung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація")
	return /** @type {LocalizedString} */ ("Authentication")
});
export { compareauthentication1 as "compareAuthentication" }