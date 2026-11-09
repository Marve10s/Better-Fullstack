/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderopendocumentation2Inputs */



/**
* | output |
* | --- |
* | "Open documentation" |
*
* @param {Builderopendocumentation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderopendocumentation2 = /** @type {((inputs?: Builderopendocumentation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderopendocumentation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir documentación")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开文档")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドキュメントを開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("문서 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟文件")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dokumentation öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir la documentation")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити документацію")
	return /** @type {LocalizedString} */ ("Open documentation")
});
export { builderopendocumentation2 as "builderOpenDocumentation" }