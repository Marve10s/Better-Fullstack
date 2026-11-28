/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerauthproviders3Inputs */



/**
* | output |
* | --- |
* | "Auth providers" |
*
* @param {Homelayerauthproviders3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelayerauthproviders3 = /** @type {((inputs?: Homelayerauthproviders3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerauthproviders3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proveedores de auth")
	if (locale === "zh") return /** @type {LocalizedString} */ ("认证提供方")
	if (locale === "ja") return /** @type {LocalizedString} */ ("認証プロバイダー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("인증 제공자")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("認證提供方")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auth-Anbieter")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fournisseurs d'authentification")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Провайдери автентифікації")
	return /** @type {LocalizedString} */ ("Auth providers")
});
export { homelayerauthproviders3 as "homeLayerAuthProviders" }