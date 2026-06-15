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

/**
* | output |
* | --- |
* | "AUTH PROVIDERS" |
*
* @param {Homelayerauthproviders3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homelayerauthproviders3 = /** @type {((inputs?: Homelayerauthproviders3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerauthproviders3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerauthproviders3(inputs)
	if (locale === "es") return es_homelayerauthproviders3(inputs)
	return zh_homelayerauthproviders3(inputs)
});
export { homelayerauthproviders3 as "homeLayerAuthProviders" }