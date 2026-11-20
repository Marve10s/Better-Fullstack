/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackeffectapp4Inputs */



/**
* | output |
* | --- |
* | "In the app" |
*
* @param {Presetfuturestackeffectapp4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackeffectapp4 = /** @type {((inputs?: Presetfuturestackeffectapp4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackeffectapp4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("En la app")
	if (locale === "zh") return /** @type {LocalizedString} */ ("应用内")
	if (locale === "ja") return /** @type {LocalizedString} */ ("アプリ内")
	if (locale === "ko") return /** @type {LocalizedString} */ ("앱 안에서")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("應用程式內")
	if (locale === "de") return /** @type {LocalizedString} */ ("In der App")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dans l'application")
	if (locale === "uk") return /** @type {LocalizedString} */ ("У застосунку")
	return /** @type {LocalizedString} */ ("In the app")
});
export { presetfuturestackeffectapp4 as "presetFutureStackEffectApp" }