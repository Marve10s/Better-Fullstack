/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerauthproviders3Inputs */

const en_homelayerauthproviders3 = /** @type {(inputs: Homelayerauthproviders3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AUTH PROVIDERS`)
};

const es_homelayerauthproviders3 = /** @type {(inputs: Homelayerauthproviders3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PROVEEDORES DE AUTH`)
};

const zh_homelayerauthproviders3 = /** @type {(inputs: Homelayerauthproviders3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`认证提供方`)
};

const ja_homelayerauthproviders3 = /** @type {(inputs: Homelayerauthproviders3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`認証プロバイダー`)
};

const ko_homelayerauthproviders3 = /** @type {(inputs: Homelayerauthproviders3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`인증 제공자`)
};

const zh_hant1_homelayerauthproviders3 = /** @type {(inputs: Homelayerauthproviders3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`認證提供方`)
};

const de_homelayerauthproviders3 = /** @type {(inputs: Homelayerauthproviders3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AUTH-ANBIETER`)
};

const fr_homelayerauthproviders3 = /** @type {(inputs: Homelayerauthproviders3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FOURNISSEURS D'AUTORISATION`)
};

/**
* | output |
* | --- |
* | "AUTH PROVIDERS" |
*
* @param {Homelayerauthproviders3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homelayerauthproviders3 = /** @type {((inputs?: Homelayerauthproviders3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerauthproviders3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerauthproviders3(inputs)
	if (locale === "es") return es_homelayerauthproviders3(inputs)
	if (locale === "zh") return zh_homelayerauthproviders3(inputs)
	if (locale === "ja") return ja_homelayerauthproviders3(inputs)
	if (locale === "ko") return ko_homelayerauthproviders3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homelayerauthproviders3(inputs)
	if (locale === "de") return de_homelayerauthproviders3(inputs)
	return fr_homelayerauthproviders3(inputs)
});
export { homelayerauthproviders3 as "homeLayerAuthProviders" }