/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewfilecount3Inputs */



/**
* | output |
* | --- |
* | "{count} files" |
*
* @param {Builderpreviewfilecount3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewfilecount3 = /** @type {((inputs: Builderpreviewfilecount3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfilecount3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} archivos`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个文件`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} ファイル`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 파일`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個文件`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Dateien`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} fichiers`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} файлів`)
	return /** @type {LocalizedString} */ (`${i?.count} files`)
});
export { builderpreviewfilecount3 as "builderPreviewFileCount" }