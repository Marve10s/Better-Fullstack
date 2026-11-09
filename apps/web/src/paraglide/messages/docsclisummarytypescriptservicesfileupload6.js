/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesfileupload6Inputs */



/**
* | output |
* | --- |
* | "File upload helper." |
*
* @param {Docsclisummarytypescriptservicesfileupload6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesfileupload6 = /** @type {((inputs?: Docsclisummarytypescriptservicesfileupload6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesfileupload6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca auxiliar para la carga de archivos.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("文件上传辅助工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ファイルアップロードのヘルパー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("파일 업로드 헬퍼.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("檔案上傳輔助工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Hilfsbibliothek für Datei-Uploads.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque d’aide au téléversement de fichiers.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Допоміжна бібліотека для завантаження файлів.")
	return /** @type {LocalizedString} */ ("File upload helper.")
});
export { docsclisummarytypescriptservicesfileupload6 as "docsCliSummaryTypescriptServicesFileUpload" }