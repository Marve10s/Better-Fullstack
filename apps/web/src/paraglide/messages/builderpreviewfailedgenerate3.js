/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewfailedgenerate3Inputs */

const en_builderpreviewfailedgenerate3 = /** @type {(inputs: Builderpreviewfailedgenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to generate preview`)
};

const es_builderpreviewfailedgenerate3 = /** @type {(inputs: Builderpreviewfailedgenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo generar la vista previa`)
};

const zh_builderpreviewfailedgenerate3 = /** @type {(inputs: Builderpreviewfailedgenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成预览失败`)
};

const ja_builderpreviewfailedgenerate3 = /** @type {(inputs: Builderpreviewfailedgenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プレビューの生成に失敗しました`)
};

const ko_builderpreviewfailedgenerate3 = /** @type {(inputs: Builderpreviewfailedgenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`미리보기를 생성하지 못했습니다.`)
};

const zh_hant1_builderpreviewfailedgenerate3 = /** @type {(inputs: Builderpreviewfailedgenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成預覽失敗`)
};

const de_builderpreviewfailedgenerate3 = /** @type {(inputs: Builderpreviewfailedgenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorschau konnte nicht erstellt werden`)
};

const fr_builderpreviewfailedgenerate3 = /** @type {(inputs: Builderpreviewfailedgenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Échec de la génération de l'aperçu`)
};

/**
* | output |
* | --- |
* | "Failed to generate preview" |
*
* @param {Builderpreviewfailedgenerate3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewfailedgenerate3 = /** @type {((inputs?: Builderpreviewfailedgenerate3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfailedgenerate3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfailedgenerate3(inputs)
	if (locale === "es") return es_builderpreviewfailedgenerate3(inputs)
	if (locale === "zh") return zh_builderpreviewfailedgenerate3(inputs)
	if (locale === "ja") return ja_builderpreviewfailedgenerate3(inputs)
	if (locale === "ko") return ko_builderpreviewfailedgenerate3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewfailedgenerate3(inputs)
	if (locale === "de") return de_builderpreviewfailedgenerate3(inputs)
	return fr_builderpreviewfailedgenerate3(inputs)
});
export { builderpreviewfailedgenerate3 as "builderPreviewFailedGenerate" }