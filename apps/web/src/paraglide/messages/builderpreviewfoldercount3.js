/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewfoldercount3Inputs */



/**
* | output |
* | --- |
* | "{count} folders" |
*
* @param {Builderpreviewfoldercount3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewfoldercount3 = /** @type {((inputs: Builderpreviewfoldercount3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfoldercount3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} carpetas`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个文件夹`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} フォルダー`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 폴더`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個資料夾`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Ordner`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} dossiers`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} папок`)
	return /** @type {LocalizedString} */ (`${i?.count} folders`)
});
export { builderpreviewfoldercount3 as "builderPreviewFolderCount" }