/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderselectfiletoview4Inputs */



/**
* | output |
* | --- |
* | "Select a file to view its content" |
*
* @param {Builderselectfiletoview4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderselectfiletoview4 = /** @type {((inputs?: Builderselectfiletoview4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderselectfiletoview4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Selecciona un archivo para ver su contenido")
	if (locale === "zh") return /** @type {LocalizedString} */ ("选择一个文件查看内容")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ファイルを選択してその内容を表示します")
	if (locale === "ko") return /** @type {LocalizedString} */ ("내용을 보려면 파일을 선택하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("選擇一個文件查看內容")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wählen Sie eine Datei aus, um deren Inhalt anzuzeigen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sélectionnez un fichier pour afficher son contenu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Виберіть файл, щоб переглянути його вміст")
	return /** @type {LocalizedString} */ ("Select a file to view its content")
});
export { builderselectfiletoview4 as "builderSelectFileToView" }