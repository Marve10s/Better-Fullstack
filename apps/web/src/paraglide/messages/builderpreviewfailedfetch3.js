/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewfailedfetch3Inputs */

const en_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to fetch preview`)
};

const es_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo cargar la vista previa`)
};

const zh_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`获取预览失败`)
};

const ja_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プレビューの取得に失敗しました`)
};

const ko_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`미리보기를 가져오지 못했습니다.`)
};

const zh_hant1_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取得預覽失敗`)
};

const de_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorschau konnte nicht abgerufen werden`)
};

const fr_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Échec de la récupération de l'aperçu`)
};

const uk_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не вдалося отримати попередній перегляд`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfailedfetch3(inputs)
	if (locale === "es") return es_builderpreviewfailedfetch3(inputs)
	if (locale === "zh") return zh_builderpreviewfailedfetch3(inputs)
	if (locale === "ja") return ja_builderpreviewfailedfetch3(inputs)
	if (locale === "ko") return ko_builderpreviewfailedfetch3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewfailedfetch3(inputs)
	if (locale === "de") return de_builderpreviewfailedfetch3(inputs)
	if (locale === "fr") return fr_builderpreviewfailedfetch3(inputs)
	return uk_builderpreviewfailedfetch3(inputs)
});
export { builderpreviewfailedfetch3 as "builderPreviewFailedFetch" }