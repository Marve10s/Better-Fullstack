/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunselectfile3Inputs */

const en_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select a file to edit`)
};

const es_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selecciona un archivo para editar`)
};

const zh_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择要编辑的文件`)
};

const ja_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`編集するファイルを選択`)
};

const ko_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`편집할 파일 선택`)
};

const zh_hant1_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選擇要編輯的檔案`)
};

const de_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datei zum Bearbeiten auswählen`)
};

const fr_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sélectionnez un fichier à modifier`)
};

const uk_builderrunselectfile3 = /** @type {(inputs: Builderrunselectfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Виберіть файл для редагування`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunselectfile3(inputs)
	if (locale === "zh") return zh_builderrunselectfile3(inputs)
	if (locale === "ja") return ja_builderrunselectfile3(inputs)
	if (locale === "ko") return ko_builderrunselectfile3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunselectfile3(inputs)
	if (locale === "de") return de_builderrunselectfile3(inputs)
	if (locale === "fr") return fr_builderrunselectfile3(inputs)
	if (locale === "uk") return uk_builderrunselectfile3(inputs)
	return en_builderrunselectfile3(inputs)
});
export { builderrunselectfile3 as "builderRunSelectFile" }