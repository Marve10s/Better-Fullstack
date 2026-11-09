/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowplannote3Inputs */



/**
* | output |
* | --- |
* | "dry-run preview, 59 files" |
*
* @param {Mcpworkflowplannote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowplannote3 = /** @type {((inputs?: Mcpworkflowplannote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowplannote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("vista previa dry-run, 59 archivos")
	if (locale === "zh") return /** @type {LocalizedString} */ ("dry-run 预览，59 个文件")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドライラン プレビュー、59 ファイル")
	if (locale === "ko") return /** @type {LocalizedString} */ ("테스트 실행 미리보기, 59개 파일")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("dry-run 預覽，59 個文件")
	if (locale === "de") return /** @type {LocalizedString} */ ("Probelaufvorschau, 59 Dateien")
	if (locale === "fr") return /** @type {LocalizedString} */ ("aperçu à blanc, 59 fichiers")
	if (locale === "uk") return /** @type {LocalizedString} */ ("попередній перегляд, 59 файлів")
	return /** @type {LocalizedString} */ ("dry-run preview, 59 files")
});
export { mcpworkflowplannote3 as "mcpWorkflowPlanNote" }