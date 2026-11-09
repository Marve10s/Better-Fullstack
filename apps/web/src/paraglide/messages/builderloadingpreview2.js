/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderloadingpreview2Inputs */



/**
* | output |
* | --- |
* | "Loading preview..." |
*
* @param {Builderloadingpreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderloadingpreview2 = /** @type {((inputs?: Builderloadingpreview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderloadingpreview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cargando vista previa...")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在加载预览...")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プレビューを読み込んでいます...")
	if (locale === "ko") return /** @type {LocalizedString} */ ("미리보기 로드 중...")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在載入預覽...")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorschau wird geladen...")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Chargement de l'aperçu...")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Завантаження попереднього перегляду...")
	return /** @type {LocalizedString} */ ("Loading preview...")
});
export { builderloadingpreview2 as "builderLoadingPreview" }