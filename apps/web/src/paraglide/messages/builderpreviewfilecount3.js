/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewfilecount3Inputs */

const en_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} files`)
};

const es_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} archivos`)
};

const zh_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个文件`)
};

const ja_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} ファイル`)
};

const ko_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 파일`)
};

const zh_hant1_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個文件`)
};

const de_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Dateien`)
};

const fr_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Fichiers ${i?.count}`)
};

/**
* | output |
* | --- |
* | "{count} files" |
*
* @param {Builderpreviewfilecount3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewfilecount3 = /** @type {((inputs: Builderpreviewfilecount3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfilecount3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfilecount3(inputs)
	if (locale === "es") return es_builderpreviewfilecount3(inputs)
	if (locale === "zh") return zh_builderpreviewfilecount3(inputs)
	if (locale === "ja") return ja_builderpreviewfilecount3(inputs)
	if (locale === "ko") return ko_builderpreviewfilecount3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewfilecount3(inputs)
	if (locale === "de") return de_builderpreviewfilecount3(inputs)
	return fr_builderpreviewfilecount3(inputs)
});
export { builderpreviewfilecount3 as "builderPreviewFileCount" }