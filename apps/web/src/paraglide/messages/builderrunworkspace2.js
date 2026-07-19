/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunworkspace2Inputs */

const en_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project files`)
};

const es_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Archivos del proyecto`)
};

const zh_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目文件`)
};

const ja_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクトファイル`)
};

const ko_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트 파일`)
};

const zh_hant1_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`專案檔案`)
};

const de_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projektdateien`)
};

const fr_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fichiers du projet`)
};

const uk_builderrunworkspace2 = /** @type {(inputs: Builderrunworkspace2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Файли проєкту`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunworkspace2(inputs)
	if (locale === "es") return es_builderrunworkspace2(inputs)
	if (locale === "zh") return zh_builderrunworkspace2(inputs)
	if (locale === "ja") return ja_builderrunworkspace2(inputs)
	if (locale === "ko") return ko_builderrunworkspace2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunworkspace2(inputs)
	if (locale === "de") return de_builderrunworkspace2(inputs)
	if (locale === "fr") return fr_builderrunworkspace2(inputs)
	return uk_builderrunworkspace2(inputs)
});
export { builderrunworkspace2 as "builderRunWorkspace" }