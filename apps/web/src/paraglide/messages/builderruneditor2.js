/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderruneditor2Inputs */



/**
* | output |
* | --- |
* | "Code editor" |
*
* @param {Builderruneditor2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderruneditor2 = /** @type {((inputs?: Builderruneditor2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderruneditor2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Editor de código")
	if (locale === "zh") return /** @type {LocalizedString} */ ("代码编辑器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コードエディター")
	if (locale === "ko") return /** @type {LocalizedString} */ ("코드 편집기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("程式碼編輯器")
	if (locale === "de") return /** @type {LocalizedString} */ ("Code-Editor")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Éditeur de code")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Редактор коду")
	return /** @type {LocalizedString} */ ("Code editor")
});
export { builderruneditor2 as "builderRunEditor" }