/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersetup1Inputs */



/**
* | output |
* | --- |
* | "setup" |
*
* @param {Buildersetup1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersetup1 = /** @type {((inputs?: Buildersetup1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersetup1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("configuración")
	if (locale === "zh") return /** @type {LocalizedString} */ ("设置")
	if (locale === "ja") return /** @type {LocalizedString} */ ("設定")
	if (locale === "ko") return /** @type {LocalizedString} */ ("설정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("設定")
	if (locale === "de") return /** @type {LocalizedString} */ ("Einrichtung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("installation")
	if (locale === "uk") return /** @type {LocalizedString} */ ("налаштування")
	return /** @type {LocalizedString} */ ("setup")
});
export { buildersetup1 as "builderSetup" }