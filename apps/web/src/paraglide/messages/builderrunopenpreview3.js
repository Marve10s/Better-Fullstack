/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunopenpreview3Inputs */



/**
* | output |
* | --- |
* | "Open preview" |
*
* @param {Builderrunopenpreview3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunopenpreview3 = /** @type {((inputs?: Builderrunopenpreview3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunopenpreview3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir vista previa")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开预览")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プレビューを開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("미리보기 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟預覽")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorschau öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir l’aperçu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити перегляд")
	return /** @type {LocalizedString} */ ("Open preview")
});
export { builderrunopenpreview3 as "builderRunOpenPreview" }