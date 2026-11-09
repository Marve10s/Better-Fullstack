/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewfailedfetch3Inputs */



/**
* | output |
* | --- |
* | "Failed to fetch preview" |
*
* @param {Builderpreviewfailedfetch3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewfailedfetch3 = /** @type {((inputs?: Builderpreviewfailedfetch3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfailedfetch3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se pudo cargar la vista previa")
	if (locale === "zh") return /** @type {LocalizedString} */ ("获取预览失败")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プレビューの取得に失敗しました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("미리보기를 가져오지 못했습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("取得預覽失敗")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorschau konnte nicht abgerufen werden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Échec de la récupération de l'aperçu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не вдалося отримати попередній перегляд")
	return /** @type {LocalizedString} */ ("Failed to fetch preview")
});
export { builderpreviewfailedfetch3 as "builderPreviewFailedFetch" }