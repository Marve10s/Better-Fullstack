/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeopenbuilder2Inputs */



/**
* | output |
* | --- |
* | "Open the builder" |
*
* @param {Homeopenbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeopenbuilder2 = /** @type {((inputs?: Homeopenbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeopenbuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir el constructor")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开构建器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルダーを開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌더 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("打開建構器")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffnen Sie den Builder")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir le constructeur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити конструктор")
	return /** @type {LocalizedString} */ ("Open the builder")
});
export { homeopenbuilder2 as "homeOpenBuilder" }