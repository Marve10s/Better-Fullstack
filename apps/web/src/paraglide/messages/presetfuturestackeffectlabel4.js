/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackeffectlabel4Inputs */



/**
* | output |
* | --- |
* | "Effect runs" |
*
* @param {Presetfuturestackeffectlabel4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackeffectlabel4 = /** @type {((inputs?: Presetfuturestackeffectlabel4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackeffectlabel4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Effect se ejecuta")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Effect 运行于")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Effect の実行場所")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Effect 실행 위치")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Effect 執行於")
	if (locale === "de") return /** @type {LocalizedString} */ ("Effect läuft")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Effect s'exécute")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Effect працює")
	return /** @type {LocalizedString} */ ("Effect runs")
});
export { presetfuturestackeffectlabel4 as "presetFutureStackEffectLabel" }