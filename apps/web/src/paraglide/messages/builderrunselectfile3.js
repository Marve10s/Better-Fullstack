/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunselectfile3Inputs */



/**
* | output |
* | --- |
* | "Select a file to edit" |
*
* @param {Builderrunselectfile3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunselectfile3 = /** @type {((inputs?: Builderrunselectfile3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunselectfile3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Selecciona un archivo para editar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("选择要编辑的文件")
	if (locale === "ja") return /** @type {LocalizedString} */ ("編集するファイルを選択")
	if (locale === "ko") return /** @type {LocalizedString} */ ("편집할 파일 선택")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("選擇要編輯的檔案")
	if (locale === "de") return /** @type {LocalizedString} */ ("Datei zum Bearbeiten auswählen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sélectionnez un fichier à modifier")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Виберіть файл для редагування")
	return /** @type {LocalizedString} */ ("Select a file to edit")
});
export { builderrunselectfile3 as "builderRunSelectFile" }