/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderseotitle2Inputs */



/**
* | output |
* | --- |
* | "Stack Builder \| Better Fullstack" |
*
* @param {Builderseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderseotitle2 = /** @type {((inputs?: Builderseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Constructor de stack | Better Fullstack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Stack 构建器 | Better Fullstack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Stack Builder | Better Fullstack")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Stack Builder | Better Fullstack")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Stack 建構器 | Better Fullstack")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stack Builder | Better Fullstack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Stack Builder | Better Fullstack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Конструктор стеку | Better Fullstack")
	return /** @type {LocalizedString} */ ("Stack Builder | Better Fullstack")
});
export { builderseotitle2 as "builderSeoTitle" }