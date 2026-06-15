/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareauthentication1Inputs */

const en_compareauthentication1 = /** @type {(inputs: Compareauthentication1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentication`)
};

const es_compareauthentication1 = /** @type {(inputs: Compareauthentication1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación`)
};

const zh_compareauthentication1 = /** @type {(inputs: Compareauthentication1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`认证`)
};

/**
* | output |
* | --- |
* | "Authentication" |
*
* @param {Compareauthentication1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareauthentication1 = /** @type {((inputs?: Compareauthentication1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareauthentication1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareauthentication1(inputs)
	if (locale === "es") return es_compareauthentication1(inputs)
	return zh_compareauthentication1(inputs)
});
export { compareauthentication1 as "compareAuthentication" }