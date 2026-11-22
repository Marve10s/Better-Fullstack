/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsectionpreferences2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Preferencias")
	if (locale === "zh") return /** @type {LocalizedString} */ ("偏好设置")
	if (locale === "ja") return /** @type {LocalizedString} */ ("設定")
	if (locale === "ko") return /** @type {LocalizedString} */ ("환경설정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("偏好設定")
	if (locale === "de") return /** @type {LocalizedString} */ ("Einstellungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Préférences")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштування")
	return /** @type {LocalizedString} */ ("Preferences")
});
export { navsectionpreferences2 as "navSectionPreferences" }