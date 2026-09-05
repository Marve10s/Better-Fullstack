/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposereditproject3Inputs */

const en_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit project settings`)
};

const es_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Editar ajustes del proyecto`)
};

const zh_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`编辑项目设置`)
};

const ja_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクト設定を編集`)
};

const ko_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트 설정 편집`)
};

const zh_hant1_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`編輯專案設定`)
};

const de_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projekteinstellungen bearbeiten`)
};

const fr_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modifier les paramètres du projet`)
};

const uk_buildercomposereditproject3 = /** @type {(inputs: Buildercomposereditproject3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Редагувати параметри проєкту`)
};

/**
* | output |
* | --- |
* | "Edit project settings" |
*
* @param {Buildercomposereditproject3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposereditproject3 = /** @type {((inputs?: Buildercomposereditproject3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposereditproject3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposereditproject3(inputs)
	if (locale === "zh") return zh_buildercomposereditproject3(inputs)
	if (locale === "ja") return ja_buildercomposereditproject3(inputs)
	if (locale === "ko") return ko_buildercomposereditproject3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposereditproject3(inputs)
	if (locale === "de") return de_buildercomposereditproject3(inputs)
	if (locale === "fr") return fr_buildercomposereditproject3(inputs)
	if (locale === "uk") return uk_buildercomposereditproject3(inputs)
	return en_buildercomposereditproject3(inputs)
});
export { buildercomposereditproject3 as "builderComposerEditProject" }