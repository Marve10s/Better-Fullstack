/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewfiles2Inputs */



/**
* | output |
* | --- |
* | "Files" |
*
* @param {Builderpreviewfiles2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewfiles2 = /** @type {((inputs?: Builderpreviewfiles2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfiles2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Archivos")
	if (locale === "zh") return /** @type {LocalizedString} */ ("文件")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ファイル")
	if (locale === "ko") return /** @type {LocalizedString} */ ("파일")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("文件")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dateien")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fichiers")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Файли")
	return /** @type {LocalizedString} */ ("Files")
});
export { builderpreviewfiles2 as "builderPreviewFiles" }