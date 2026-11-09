/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ fileName: NonNullable<unknown> }} Builderdownloadcomplete2Inputs */



/**
* | output |
* | --- |
* | "Downloaded {fileName}" |
*
* @param {Builderdownloadcomplete2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdownloadcomplete2 = /** @type {((inputs: Builderdownloadcomplete2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdownloadcomplete2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Se descargó ${i?.fileName}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`已下载 ${i?.fileName}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.fileName}をダウンロードしました`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.fileName} 다운로드 완료`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`已下載 ${i?.fileName}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.fileName} wurde heruntergeladen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.fileName} a été téléchargé`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Завантажено ${i?.fileName}`)
	return /** @type {LocalizedString} */ (`Downloaded ${i?.fileName}`)
});
export { builderdownloadcomplete2 as "builderDownloadComplete" }