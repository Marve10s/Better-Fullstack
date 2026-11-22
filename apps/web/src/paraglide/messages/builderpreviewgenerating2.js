/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewgenerating2Inputs */



/**
* | output |
* | --- |
* | "Generating preview..." |
*
* @param {Builderpreviewgenerating2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewgenerating2 = /** @type {((inputs?: Builderpreviewgenerating2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewgenerating2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Generando vista previa...")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在生成预览...")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プレビューを生成中...")
	if (locale === "ko") return /** @type {LocalizedString} */ ("미리보기 생성 중...")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在生成預覽...")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorschau wird erstellt...")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Génération d'un aperçu...")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Генеруємо попередній перегляд...")
	return /** @type {LocalizedString} */ ("Generating preview...")
});
export { builderpreviewgenerating2 as "builderPreviewGenerating" }