/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareopenbuilder2Inputs */



/**
* | output |
* | --- |
* | "Open Stack Builder" |
*
* @param {Compareopenbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareopenbuilder2 = /** @type {((inputs?: Compareopenbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareopenbuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir constructor de stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开 Stack 构建器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Stack Builder を開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Stack Builder 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟 Stack 建構器")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffnen Sie Stack Builder")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir Stack Builder")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити конструктор стеку")
	return /** @type {LocalizedString} */ ("Open Stack Builder")
});
export { compareopenbuilder2 as "compareOpenBuilder" }