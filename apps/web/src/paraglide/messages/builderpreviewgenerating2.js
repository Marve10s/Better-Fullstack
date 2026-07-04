/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewgenerating2Inputs */

const en_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating preview...`)
};

const es_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generando vista previa...`)
};

const zh_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在生成预览...`)
};

const ja_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プレビューを生成中...`)
};

const ko_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`미리보기 생성 중...`)
};

const zh_hant1_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在生成預覽...`)
};

const de_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorschau wird erstellt...`)
};

const fr_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Génération d'un aperçu...`)
};

/**
* | output |
* | --- |
* | "Generating preview..." |
*
* @param {Builderpreviewgenerating2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewgenerating2 = /** @type {((inputs?: Builderpreviewgenerating2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewgenerating2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewgenerating2(inputs)
	if (locale === "es") return es_builderpreviewgenerating2(inputs)
	if (locale === "zh") return zh_builderpreviewgenerating2(inputs)
	if (locale === "ja") return ja_builderpreviewgenerating2(inputs)
	if (locale === "ko") return ko_builderpreviewgenerating2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewgenerating2(inputs)
	if (locale === "de") return de_builderpreviewgenerating2(inputs)
	return fr_builderpreviewgenerating2(inputs)
});
export { builderpreviewgenerating2 as "builderPreviewGenerating" }