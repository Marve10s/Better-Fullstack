/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsectionpreferences2Inputs */

const en_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preferences`)
};

const es_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preferencias`)
};

const zh_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`偏好设置`)
};

const ja_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`設定`)
};

const ko_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`환경설정`)
};

const zh_hant1_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`偏好設定`)
};

const de_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Einstellungen`)
};

const fr_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préférences`)
};

const uk_navsectionpreferences2 = /** @type {(inputs: Navsectionpreferences2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштування`)
};

/**
* | output |
* | --- |
* | "Preferences" |
*
* @param {Navsectionpreferences2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navsectionpreferences2 = /** @type {((inputs?: Navsectionpreferences2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsectionpreferences2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navsectionpreferences2(inputs)
	if (locale === "es") return es_navsectionpreferences2(inputs)
	if (locale === "zh") return zh_navsectionpreferences2(inputs)
	if (locale === "ja") return ja_navsectionpreferences2(inputs)
	if (locale === "ko") return ko_navsectionpreferences2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navsectionpreferences2(inputs)
	if (locale === "de") return de_navsectionpreferences2(inputs)
	if (locale === "fr") return fr_navsectionpreferences2(inputs)
	return uk_navsectionpreferences2(inputs)
});
export { navsectionpreferences2 as "navSectionPreferences" }