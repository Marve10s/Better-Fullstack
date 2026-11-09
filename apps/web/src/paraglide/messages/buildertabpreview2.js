/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabpreview2Inputs */



/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Buildertabpreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildertabpreview2 = /** @type {((inputs?: Buildertabpreview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabpreview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Vista previa")
	if (locale === "zh") return /** @type {LocalizedString} */ ("预览")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プレビュー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("미리보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預覽")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorschau")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aperçu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Попередній перегляд")
	return /** @type {LocalizedString} */ ("Preview")
});
export { buildertabpreview2 as "builderTabPreview" }