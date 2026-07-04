/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewinfo2Inputs */

const en_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview info`)
};

const es_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Información de vista previa`)
};

const zh_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预览信息`)
};

const ja_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プレビュー情報`)
};

const ko_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`미리보기 정보`)
};

const zh_hant1_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預覽資訊`)
};

const de_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorschauinformationen`)
};

const fr_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Informations sur l'aperçu`)
};

/**
* | output |
* | --- |
* | "Preview info" |
*
* @param {Builderpreviewinfo2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewinfo2 = /** @type {((inputs?: Builderpreviewinfo2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewinfo2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewinfo2(inputs)
	if (locale === "es") return es_builderpreviewinfo2(inputs)
	if (locale === "zh") return zh_builderpreviewinfo2(inputs)
	if (locale === "ja") return ja_builderpreviewinfo2(inputs)
	if (locale === "ko") return ko_builderpreviewinfo2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewinfo2(inputs)
	if (locale === "de") return de_builderpreviewinfo2(inputs)
	return fr_builderpreviewinfo2(inputs)
});
export { builderpreviewinfo2 as "builderPreviewInfo" }