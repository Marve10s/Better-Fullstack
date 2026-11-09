/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackuse3Inputs */



/**
* | output |
* | --- |
* | "Use this stack" |
*
* @param {Presetfuturestackuse3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackuse3 = /** @type {((inputs?: Presetfuturestackuse3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackuse3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Usar este stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用此技术栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このスタックを使う")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 스택 사용")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用此技術堆疊")
	if (locale === "de") return /** @type {LocalizedString} */ ("Diesen Stack verwenden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Utiliser ce stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Використати цей стек")
	return /** @type {LocalizedString} */ ("Use this stack")
});
export { presetfuturestackuse3 as "presetFutureStackUse" }