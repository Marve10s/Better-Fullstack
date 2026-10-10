/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesfileupload6Inputs */

const en_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`File upload helper.`)
};

const es_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca auxiliar para la carga de archivos.`)
};

const zh_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件上传辅助工具。`)
};

const ja_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ファイルアップロードのヘルパー。`)
};

const ko_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`파일 업로드 헬퍼.`)
};

const zh_hant1_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`檔案上傳輔助工具。`)
};

const de_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hilfsbibliothek für Datei-Uploads.`)
};

const fr_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque d’aide au téléversement de fichiers.`)
};

const uk_docsclisummarytypescriptservicesfileupload6 = /** @type {(inputs: Docsclisummarytypescriptservicesfileupload6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Допоміжна бібліотека для завантаження файлів.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesfileupload6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesfileupload6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesfileupload6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesfileupload6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesfileupload6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesfileupload6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesfileupload6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesfileupload6(inputs)
	return en_docsclisummarytypescriptservicesfileupload6(inputs)
});
export { docsclisummarytypescriptservicesfileupload6 as "docsCliSummaryTypescriptServicesFileUpload" }