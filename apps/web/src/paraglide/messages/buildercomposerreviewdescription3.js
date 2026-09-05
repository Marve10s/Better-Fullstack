/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerreviewdescription3Inputs */

const en_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Check the selected applications and their capabilities, then preview the files or generate your project.`)
};

const es_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Revisa las aplicaciones seleccionadas y sus funciones; después, previsualiza los archivos o genera tu proyecto.`)
};

const zh_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`检查所选应用及其功能，然后预览文件或生成项目。`)
};

const ja_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選択したアプリケーションと機能を確認してから、ファイルをプレビューするかプロジェクトを生成してください。`)
};

const ko_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`선택한 애플리케이션과 기능을 확인한 다음 파일을 미리 보거나 프로젝트를 생성하세요.`)
};

const zh_hant1_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`檢查所選應用程式及其功能，然後預覽檔案或產生專案。`)
};

const de_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prüfe die ausgewählten Anwendungen und ihre Funktionen. Sieh dir anschließend die Dateien an oder generiere dein Projekt.`)
};

const fr_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vérifiez les applications sélectionnées et leurs fonctionnalités, puis prévisualisez les fichiers ou générez votre projet.`)
};

const uk_buildercomposerreviewdescription3 = /** @type {(inputs: Buildercomposerreviewdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевірте вибрані застосунки та їхні можливості, а потім перегляньте файли або згенеруйте проєкт.`)
};

/**
* | output |
* | --- |
* | "Check the selected applications and their capabilities, then preview the files or generate your project." |
*
* @param {Buildercomposerreviewdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerreviewdescription3 = /** @type {((inputs?: Buildercomposerreviewdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerreviewdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerreviewdescription3(inputs)
	if (locale === "zh") return zh_buildercomposerreviewdescription3(inputs)
	if (locale === "ja") return ja_buildercomposerreviewdescription3(inputs)
	if (locale === "ko") return ko_buildercomposerreviewdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerreviewdescription3(inputs)
	if (locale === "de") return de_buildercomposerreviewdescription3(inputs)
	if (locale === "fr") return fr_buildercomposerreviewdescription3(inputs)
	if (locale === "uk") return uk_buildercomposerreviewdescription3(inputs)
	return en_buildercomposerreviewdescription3(inputs)
});
export { buildercomposerreviewdescription3 as "builderComposerReviewDescription" }