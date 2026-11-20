/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewfailedgenerate3Inputs */



/**
* | output |
* | --- |
* | "Failed to generate preview" |
*
* @param {Builderpreviewfailedgenerate3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewfailedgenerate3 = /** @type {((inputs?: Builderpreviewfailedgenerate3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfailedgenerate3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se pudo generar la vista previa")
	if (locale === "zh") return /** @type {LocalizedString} */ ("生成预览失败")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プレビューの生成に失敗しました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("미리보기를 생성하지 못했습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("生成預覽失敗")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorschau konnte nicht erstellt werden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Échec de la génération de l'aperçu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не вдалося створити попередній перегляд")
	return /** @type {LocalizedString} */ ("Failed to generate preview")
});
export { builderpreviewfailedgenerate3 as "builderPreviewFailedGenerate" }