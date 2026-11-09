/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewinfo2Inputs */



/**
* | output |
* | --- |
* | "Preview info" |
*
* @param {Builderpreviewinfo2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewinfo2 = /** @type {((inputs?: Builderpreviewinfo2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewinfo2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Información de vista previa")
	if (locale === "zh") return /** @type {LocalizedString} */ ("预览信息")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プレビュー情報")
	if (locale === "ko") return /** @type {LocalizedString} */ ("미리보기 정보")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預覽資訊")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorschauinformationen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Informations sur l'aperçu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інформація про попередній перегляд")
	return /** @type {LocalizedString} */ ("Preview info")
});
export { builderpreviewinfo2 as "builderPreviewInfo" }