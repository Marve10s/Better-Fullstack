/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderselectfiletoview4Inputs */

const en_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select a file to view its content`)
};

const es_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selecciona un archivo para ver su contenido`)
};

const zh_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择一个文件查看内容`)
};

const ja_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ファイルを選択してその内容を表示します`)
};

const ko_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`내용을 보려면 파일을 선택하세요.`)
};

const zh_hant1_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選擇一個文件查看內容`)
};

const de_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wählen Sie eine Datei aus, um deren Inhalt anzuzeigen`)
};

const fr_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sélectionnez un fichier pour afficher son contenu`)
};

/**
* | output |
* | --- |
* | "Select a file to view its content" |
*
* @param {Builderselectfiletoview4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderselectfiletoview4 = /** @type {((inputs?: Builderselectfiletoview4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderselectfiletoview4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderselectfiletoview4(inputs)
	if (locale === "es") return es_builderselectfiletoview4(inputs)
	if (locale === "zh") return zh_builderselectfiletoview4(inputs)
	if (locale === "ja") return ja_builderselectfiletoview4(inputs)
	if (locale === "ko") return ko_builderselectfiletoview4(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderselectfiletoview4(inputs)
	if (locale === "de") return de_builderselectfiletoview4(inputs)
	return fr_builderselectfiletoview4(inputs)
});
export { builderselectfiletoview4 as "builderSelectFileToView" }