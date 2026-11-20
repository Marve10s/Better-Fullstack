/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersettings1Inputs */



/**
* | output |
* | --- |
* | "Builder settings" |
*
* @param {Buildersettings1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersettings1 = /** @type {((inputs?: Buildersettings1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersettings1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ajustes del constructor")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建器设置")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルダー設定")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌더 설정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建構器設定")
	if (locale === "de") return /** @type {LocalizedString} */ ("Builder-Einstellungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Paramètres du constructeur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштування конструктора")
	return /** @type {LocalizedString} */ ("Builder settings")
});
export { buildersettings1 as "builderSettings" }