/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerprogress2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Progreso de creación del proyecto")
	if (locale === "zh") return /** @type {LocalizedString} */ ("项目创建进度")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクト作成の進行状況")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트 생성 진행 상황")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("專案建立進度")
	if (locale === "de") return /** @type {LocalizedString} */ ("Fortschritt der Projekterstellung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Progression de la création du projet")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Хід створення проєкту")
	return /** @type {LocalizedString} */ ("Project creation progress")
});
export { buildercomposerprogress2 as "builderComposerProgress" }