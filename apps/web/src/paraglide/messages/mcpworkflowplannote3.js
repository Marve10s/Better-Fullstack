/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowplannote3Inputs */

const en_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`dry-run preview, 59 files`)
};

const es_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`vista previa dry-run, 59 archivos`)
};

const zh_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`dry-run 预览，59 个文件`)
};

const ja_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`予行演習プレビュー、59 ファイル`)
};

const ko_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`테스트 실행 미리보기, 59개 파일`)
};

const zh_hant1_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`dry-run 預覽，59 個文件`)
};

const de_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Probelaufvorschau, 59 Dateien`)
};

const fr_mcpworkflowplannote3 = /** @type {(inputs: Mcpworkflowplannote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`aperçu à sec, 59 fichiers`)
};

/**
* | output |
* | --- |
* | "dry-run preview, 59 files" |
*
* @param {Mcpworkflowplannote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowplannote3 = /** @type {((inputs?: Mcpworkflowplannote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowplannote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowplannote3(inputs)
	if (locale === "es") return es_mcpworkflowplannote3(inputs)
	if (locale === "zh") return zh_mcpworkflowplannote3(inputs)
	if (locale === "ja") return ja_mcpworkflowplannote3(inputs)
	if (locale === "ko") return ko_mcpworkflowplannote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowplannote3(inputs)
	if (locale === "de") return de_mcpworkflowplannote3(inputs)
	return fr_mcpworkflowplannote3(inputs)
});
export { mcpworkflowplannote3 as "mcpWorkflowPlanNote" }