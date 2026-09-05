/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerprogress2Inputs */

const en_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const es_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progreso de creación del proyecto`)
};

const zh_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目创建进度`)
};

const ja_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクト作成の進行状況`)
};

const ko_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트 생성 진행 상황`)
};

const zh_hant1_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`專案建立進度`)
};

const de_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fortschritt der Projekterstellung`)
};

const fr_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Progression de la création du projet`)
};

const uk_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Хід створення проєкту`)
};

/**
* | output |
* | --- |
* | "Project creation progress" |
*
* @param {Buildercomposerprogress2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerprogress2 = /** @type {((inputs?: Buildercomposerprogress2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerprogress2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerprogress2(inputs)
	if (locale === "zh") return zh_buildercomposerprogress2(inputs)
	if (locale === "ja") return ja_buildercomposerprogress2(inputs)
	if (locale === "ko") return ko_buildercomposerprogress2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerprogress2(inputs)
	if (locale === "de") return de_buildercomposerprogress2(inputs)
	if (locale === "fr") return fr_buildercomposerprogress2(inputs)
	if (locale === "uk") return uk_buildercomposerprogress2(inputs)
	return en_buildercomposerprogress2(inputs)
});
export { buildercomposerprogress2 as "builderComposerProgress" }