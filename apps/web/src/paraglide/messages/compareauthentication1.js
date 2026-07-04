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

const ja_compareauthentication1 = /** @type {(inputs: Compareauthentication1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`認証`)
};

const ko_compareauthentication1 = /** @type {(inputs: Compareauthentication1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`입증`)
};

const zh_hant1_compareauthentication1 = /** @type {(inputs: Compareauthentication1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`認證`)
};

const de_compareauthentication1 = /** @type {(inputs: Compareauthentication1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierung`)
};

const fr_compareauthentication1 = /** @type {(inputs: Compareauthentication1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification`)
};

/**
* | output |
* | --- |
* | "Authentication" |
*
* @param {Compareauthentication1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareauthentication1 = /** @type {((inputs?: Compareauthentication1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareauthentication1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareauthentication1(inputs)
	if (locale === "es") return es_compareauthentication1(inputs)
	if (locale === "zh") return zh_compareauthentication1(inputs)
	if (locale === "ja") return ja_compareauthentication1(inputs)
	if (locale === "ko") return ko_compareauthentication1(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareauthentication1(inputs)
	if (locale === "de") return de_compareauthentication1(inputs)
	return fr_compareauthentication1(inputs)
});
export { compareauthentication1 as "compareAuthentication" }