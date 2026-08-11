/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runcolauth2Inputs */

const en_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auth`)
};

const es_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación`)
};

const zh_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`身份验证`)
};

const ja_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`認証`)
};

const ko_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`인증`)
};

const zh_hant1_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`身份驗證`)
};

const de_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierung`)
};

const fr_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification`)
};

const uk_runcolauth2 = /** @type {(inputs: Runcolauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автентифікація`)
};

/**
* | output |
* | --- |
* | "Auth" |
*
* @param {Runcolauth2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runcolauth2 = /** @type {((inputs?: Runcolauth2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runcolauth2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runcolauth2(inputs)
	if (locale === "zh") return zh_runcolauth2(inputs)
	if (locale === "ja") return ja_runcolauth2(inputs)
	if (locale === "ko") return ko_runcolauth2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runcolauth2(inputs)
	if (locale === "de") return de_runcolauth2(inputs)
	if (locale === "fr") return fr_runcolauth2(inputs)
	if (locale === "uk") return uk_runcolauth2(inputs)
	return en_runcolauth2(inputs)
});
export { runcolauth2 as "runColAuth" }