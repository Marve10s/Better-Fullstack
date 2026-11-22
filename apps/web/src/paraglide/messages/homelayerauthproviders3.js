/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerauthproviders3Inputs */



/**
* | output |
* | --- |
* | "AUTH PROVIDERS" |
*
* @param {Homelayerauthproviders3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelayerauthproviders3 = /** @type {((inputs?: Homelayerauthproviders3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerauthproviders3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("PROVEEDORES DE AUTH")
	if (locale === "zh") return /** @type {LocalizedString} */ ("认证提供方")
	if (locale === "ja") return /** @type {LocalizedString} */ ("認証プロバイダー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("인증 제공자")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("認證提供方")
	if (locale === "de") return /** @type {LocalizedString} */ ("AUTH-ANBIETER")
	if (locale === "fr") return /** @type {LocalizedString} */ ("FOURNISSEURS D'AUTHENTIFICATION")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ПРОВАЙДЕРИ АВТЕНТИФІКАЦІЇ")
	return /** @type {LocalizedString} */ ("AUTH PROVIDERS")
});
export { homelayerauthproviders3 as "homeLayerAuthProviders" }