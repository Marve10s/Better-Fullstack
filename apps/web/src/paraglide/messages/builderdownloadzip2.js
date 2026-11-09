/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdownloadzip2Inputs */



/**
* | output |
* | --- |
* | "Download ZIP" |
*
* @param {Builderdownloadzip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdownloadzip2 = /** @type {((inputs?: Builderdownloadzip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdownloadzip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Descargar ZIP")
	if (locale === "zh") return /** @type {LocalizedString} */ ("下载 ZIP")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ZIPをダウンロード")
	if (locale === "ko") return /** @type {LocalizedString} */ ("ZIP 다운로드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("下載 ZIP")
	if (locale === "de") return /** @type {LocalizedString} */ ("ZIP herunterladen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Télécharger le ZIP")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Завантажити ZIP")
	return /** @type {LocalizedString} */ ("Download ZIP")
});
export { builderdownloadzip2 as "builderDownloadZip" }