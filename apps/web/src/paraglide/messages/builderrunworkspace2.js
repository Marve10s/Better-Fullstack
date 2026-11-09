/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunworkspace2Inputs */



/**
* | output |
* | --- |
* | "Project files" |
*
* @param {Builderrunworkspace2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunworkspace2 = /** @type {((inputs?: Builderrunworkspace2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunworkspace2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Archivos del proyecto")
	if (locale === "zh") return /** @type {LocalizedString} */ ("项目文件")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクトファイル")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트 파일")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("專案檔案")
	if (locale === "de") return /** @type {LocalizedString} */ ("Projektdateien")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fichiers du projet")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Файли проєкту")
	return /** @type {LocalizedString} */ ("Project files")
});
export { builderrunworkspace2 as "builderRunWorkspace" }