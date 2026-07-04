/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewfoldercount3Inputs */

const en_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} folders`)
};

const es_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} carpetas`)
};

const zh_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个文件夹`)
};

const ja_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} フォルダー`)
};

const ko_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 폴더`)
};

const zh_hant1_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個資料夾`)
};

const de_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Ordner`)
};

const fr_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Dossiers ${i?.count}`)
};

/**
* | output |
* | --- |
* | "{count} folders" |
*
* @param {Builderpreviewfoldercount3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewfoldercount3 = /** @type {((inputs: Builderpreviewfoldercount3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfoldercount3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfoldercount3(inputs)
	if (locale === "es") return es_builderpreviewfoldercount3(inputs)
	if (locale === "zh") return zh_builderpreviewfoldercount3(inputs)
	if (locale === "ja") return ja_builderpreviewfoldercount3(inputs)
	if (locale === "ko") return ko_builderpreviewfoldercount3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewfoldercount3(inputs)
	if (locale === "de") return de_builderpreviewfoldercount3(inputs)
	return fr_builderpreviewfoldercount3(inputs)
});
export { builderpreviewfoldercount3 as "builderPreviewFolderCount" }