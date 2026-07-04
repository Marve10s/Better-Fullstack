/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderloadingpreview2Inputs */

const en_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading preview...`)
};

const es_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargando vista previa...`)
};

const zh_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加载预览...`)
};

const ja_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プレビューを読み込んでいます...`)
};

const ko_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`미리보기 로드 중...`)
};

const zh_hant1_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加載預覽...`)
};

const de_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorschau wird geladen...`)
};

const fr_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chargement de l'aperçu...`)
};

/**
* | output |
* | --- |
* | "Loading preview..." |
*
* @param {Builderloadingpreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderloadingpreview2 = /** @type {((inputs?: Builderloadingpreview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderloadingpreview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderloadingpreview2(inputs)
	if (locale === "es") return es_builderloadingpreview2(inputs)
	if (locale === "zh") return zh_builderloadingpreview2(inputs)
	if (locale === "ja") return ja_builderloadingpreview2(inputs)
	if (locale === "ko") return ko_builderloadingpreview2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderloadingpreview2(inputs)
	if (locale === "de") return de_builderloadingpreview2(inputs)
	return fr_builderloadingpreview2(inputs)
});
export { builderloadingpreview2 as "builderLoadingPreview" }