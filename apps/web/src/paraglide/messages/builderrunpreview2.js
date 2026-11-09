/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunpreview2Inputs */



/**
* | output |
* | --- |
* | "Live preview" |
*
* @param {Builderrunpreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunpreview2 = /** @type {((inputs?: Builderrunpreview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunpreview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Vista previa en vivo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实时预览")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ライブプレビュー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("라이브 미리보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("即時預覽")
	if (locale === "de") return /** @type {LocalizedString} */ ("Live-Vorschau")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aperçu en direct")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Живий перегляд")
	return /** @type {LocalizedString} */ ("Live preview")
});
export { builderrunpreview2 as "builderRunPreview" }